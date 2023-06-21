import React from 'react';
import Images from '../components/favorites/images';

const Favorites = ({ userName }) => {

  return (
    <div>
      <>
        <Images userEmail={userName} />
      </>
    </div>
  );
};

export default Favorites;
