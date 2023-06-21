import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../favorites/favorite-page.scss';

const Images = ({ userEmail }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`/user/favorite?userName=${userEmail}`);
        setFavorites(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [userEmail]);

  return (
    <div className="fav-style">
      <div className="image-grid">
        {favorites.map((image, index) => (
          <div key={index} className="photo-item">
            <img src={image.image_url} alt="Favorite" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
