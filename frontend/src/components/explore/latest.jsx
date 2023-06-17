import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Latest = () => {
  const [images, setImages] = useState([]);

  // fetch the images when component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/explore`);
        // Sort images by creation timestamp, from most recent to oldest
        const sortedImages = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setImages(sortedImages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  // map over the array and render each image
  return (
    <div className="main">
      <h1>Latest Images</h1>
      {images.map((image, index) => (
        <img key={index} src={image.image_url} alt="Image" />
      ))}
    </div>
  );
};

export default Latest;
