import React from 'react';
import Images from '../components/favorites/images';

const Favorites = ({userName}) => {
  // State, effect, and functions for fetching and displaying favorite images

  return (
    <div>
      <h1>Favorites Page{userName}</h1>
      <button onClick={()=>console.log('yo ', userName)}>test</button>

      <Images userEmail={userName}/>
    </div>
  );
};

export default Favorites;
