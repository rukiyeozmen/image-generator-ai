import React, { useEffect, useState } from 'react';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/images');
        const data = await response.json();
        console.log("DATA: ",data)
        setImages(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
     fetchData();
  }, []);

 

  return (
    <div>
      <h1>Images</h1>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.image_url} alt="Image" />
          <p>Keyword: {image.keyword}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
