import React from 'react';
import Images from '../components/favorites/images';

const Favorites = ({username}) => {
  // State, effect, and functions for fetching and displaying favorite images

  return (
    <div>
      <h1>Favorites Page</h1>
      <Images userEmail={username}/>
    </div>
  );
};

export default Favorites;
