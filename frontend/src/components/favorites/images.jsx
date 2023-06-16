import React, { useState, useEffect } from 'react';
import axios from 'axios';

// App componeent need to pass the logged in users email to Images as a prop

const Images = ({ userEmail }) => {
  const [favorites, setFavorites] = useState([]);

  // mount component
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`/user/favorite?userName=${userEmail}`);
        setFavorites(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [userEmail]);

  // map over array and renders each image
  return (
    <div className="main">
      <h1>Favorites</h1>
      {favorites.map((image, index) => (
        <img key={index} src={image.image_url} alt="Favorite" />
      ))}
    </div>
  );
};

export default Images;

