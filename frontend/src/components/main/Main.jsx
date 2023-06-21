import React, { useState } from "react";
import axios from "axios";
import Themes from "../themes/Themes";
import "./main.scss";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';

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
} from "@mui/material";

const sizes = {
  small: "256x256",
  medium: "512x512",
  large: "1024x1024",
};

const Main = ({ userName }) => {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState(sizes.small);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [shareUrls, setShareUrls] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState([]);
  const [showHashtags, setShowHashtags] = useState(false);


  const clickHandler = async () => {
    try {
      if (prompt === "") {
        setOpen(true);
        return;
      }
      setLoading(true);
      const generateUrl = "http://localhost:8000/generate";
      const generateData = { prompt: `${prompt}. ${theme}`, size };
      const response = await axios.post(generateUrl, generateData);
      const imgSrc = response.data.src;
      const imgLink = "http://localhost:8000/" + response.data.image;
      setImg(imgSrc);
      setLoading(false);
      setDownloadUrl(imgLink);

      const hashtagsUrl = "http://localhost:8000/hashtags";
      const hashtagsData = { keywords: prompt };
      const hashtagsResponse = await axios.post(hashtagsUrl, hashtagsData);
      const hashtags = hashtagsResponse.data;
      setGeneratedHashtags(hashtags);
      setShowHashtags(true);

      const shareText = `${prompt} ${hashtags.join(" ")}`;
      const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgSrc)}&quote=${encodeURIComponent(shareText)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(imgSrc)}&text=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(imgSrc)}&title=${encodeURIComponent(shareText)}`,
      };
      setShareUrls(shareUrls);
    } catch (error) {
      setOpen(true);
      setLoading(false);
    }
  };

  const handleShare = (url) => {
    window.open(url, "_blank");
  };

  const save = async () => {
    const url = "http://localhost:8000/user/favorite";
    const data = { url: img, userName };
    const response = await axios.post(url, data);
    console.log(response?.data);
  };

  const downloadImage = () => {
    fetch(downloadUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "generated_image.png");
        document.body.appendChild(link);

        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  return (
    <div className="main">
      <div className="maincard">
        <Stack spacing={1} className="main-stack">
          <TextField label="Prompt" variant="outlined" value={prompt}
            onChange={(e) => setPrompt(e.target.value)} />
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select value={size} label="Size" onChange={(e) => setSize(e.target.value)}>
              <MenuItem value={sizes.small}>small</MenuItem>
              <MenuItem value={sizes.medium}>medium</MenuItem>
              <MenuItem value={sizes.large}>large</MenuItem>
            </Select>
            <Themes setTheme={setTheme} />
            <Button variant="contained" onClick={clickHandler}>
              Generate
            </Button>
            {loading && <CircularProgress />}

            <div className="image-wrapper">
              <div className="image-container">
                {img && <img src={img} alt="Generated" />}

                {img && (
                  <div className="image-overlay">
                    <div className="icon-buttons">

                        <img src={require('./save-fav.png')} alt="Save_fav" onClick={save}
                        className="icon-buttons" />

                      <img src={require('./download-icon.png')} alt="Download" onClick={downloadImage} className="icon-buttons" />

                      

                   
                      {shareUrls && (
                        <>
                          <img
                            src={require('./facebook-icon.png')}
                            alt="Facebook"
                            onClick={() => handleShare(shareUrls.facebook)}
                            className="icon-buttons"
                          />
                          <img
                            src={require('./twitter-icon.png')}
                            alt="Twitter"
                            onClick={() => handleShare(shareUrls.twitter)}
                            className="icon-buttons"
                          />
                          <img
                            src={require('./linkedin-icon.png')}
                            alt="LinkedIn"
                            onClick={() => handleShare(shareUrls.linkedin)}
                            className="icon-buttons"
                          />
                        </>
                      )}
                    </div>

                  </div>
                )}

                {showHashtags && generatedHashtags.length > 0 && (
                  <div className="generated-hashtags">
                    <h4>#hashtags</h4>
                    {generatedHashtags.map((hashtag, index) => (
                      <span key={index}>{hashtag}<br /></span>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </FormControl>
        </Stack>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="error">
            Please enter a prompt!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Main;
