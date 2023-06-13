import React from 'react';
import { useLocation } from 'react-router-dom';

const GeneratedImage = () => {
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  return (
    <div>
      <h1>Generated Image</h1>
      {imageUrl && <img src={imageUrl} className="image" alt="Generated AI Image" />}
    </div>
  );
};

export default GeneratedImage;
