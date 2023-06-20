import React from 'react';
import Images from '../components/favorites/images';

const Favorites = ({ userName }) => {
  // State, effect, and functions for fetching and displaying favorite images

  return (
    <div>
      <>
      
        <Images userEmail={userName} />
      </>
    </div>
  );
};

export default Favorites;
