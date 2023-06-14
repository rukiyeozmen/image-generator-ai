import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './themes.scss';

const Themes = ({ setTheme }) => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/themes');
        setThemes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchThemes();
  }, []);

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
