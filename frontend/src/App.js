import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({

})
const openai = new OpenAIApi(configuration);



const App = () => {





//old fething data 
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/images');
        const data = await response.json();
        console.log("DATA: ", data);
        setImages(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);  

 

  return (

    <main>
   
    <h1>Image Generator</h1>
    <div>
      <h1>Images</h1>
      {images.map((image, index) => (
        <div key={index}>
           <img src={image.image_url} />
        <p>Keyword: {image.keyword}</p>
       </div>
    ))}
    </div>

  </main>

  );
};

export default App;
