import React, { useState } from "react";
import axios from "axios";
import Themes from "../themes/Themes";
import './main.scss';

import {
   Stack,
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Button,
   Snackbar,
   Alert,
   CircularProgress,
   imageListClasses,
} from "@mui/material";

const sizes = {
   small: "256x256",
   medium: "512x512",
   large: "1024x1024",
};

const Main = ({ userName }) => { // Add userName prop
   const [prompt, setPrompt] = useState("");
   const [size, setSize] = useState(sizes.small);
   const [open, setOpen] = useState(false);
   const [img, setImg] = useState("");
   const [loading, setLoading] = useState(false);
   const [theme, setTheme] = useState("");

   const clickHandler = async () => {
      try {
         if (prompt === "") {
            setOpen(true);
            return;
         }
         setLoading(true);
         const url = "http://localhost:8000/generate";
         const data = { prompt: `${prompt}. ${theme}`, size };
         const response = await axios.post(url, data);
         const imgSrc = response.data.src;
         setImg(imgSrc);
         setLoading(false);
      } catch (error) {
         setOpen(true);
         setLoading(false);
         return;
      }
   };
   const save = async () => {
    console.log('save')
    try { const url = "http://localhost:8000/user/favorite";
       const data = { url: img, userName};
       const response = await axios.post(url, data);
       console.log(response?.data)
   } catch (error) {

   }

   }
   return (
      <div className="main">
         <Stack spacing={1} className="main-stack">
            <TextField label="Prompt" variant="outlined" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <FormControl fullWidth>
               <InputLabel>Size</InputLabel>
               <Select value={size} label="Size" onChange={(e) => setSize(e.target.value)}>
                  <MenuItem value={sizes.small}>small</MenuItem>
                  <MenuItem value={sizes.medium}>medium</MenuItem>
                  <MenuItem value={sizes.large}>large</MenuItem>
               </Select>
               <Themes setTheme={setTheme} />
               <Button variant="contained" onClick={clickHandler} sx={{ mt: "1rem" }}>
                  Generate
               </Button>
            </FormControl>
         </Stack>
         {loading && <CircularProgress color="success" sx={{ mt: "1rem" }} />}
         {img !== "" &&
          <>

          <img src={img} alt="img" /> 
          <button onClick={()=> save()}>save</button>
          </>}
         <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message="Note archived">
            <Alert severity="error">This is an error alert — check it out!</Alert>
         </Snackbar>
      </div>
   );
};

export default Main;
