import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Images = ({ userEmail }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`/user/favorites?email=${userEmail}`);
        setFavorites(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [userEmail]);

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
