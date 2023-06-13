import React, { useState } from 'react';
import '../styles/Themes.scss';

const themes = [
  { label: 'Pencil', content: 'Hand-drawn with graphite pencil' },
  { label: 'Picasso', content: 'In the abstract style of Picasso' },
  { label: 'Retro', content: 'In the style of groovy retro funk' },
  // ...add more themes here
];

const Themes = ({ setTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState();

  const handleThemeClick = (theme) => {
    setSelectedTheme(theme.label);
    setTheme(theme.content);
  };

  return (
    <div>
       {themes.map((theme) => (
        <button 
          className={`theme-button ${selectedTheme === theme.label ? 'theme-button-selected' : ''}`}
          onClick={() => handleThemeClick(theme)}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
};

export default Themes;