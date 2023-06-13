import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import InputBox from './components/InputBox';
import { Configuration, OpenAIApi } from 'openai';
import GeneratedImage from './components/GeneratedImage';
import Themes from './components/Themes';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

const App = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [theme, setTheme] = useState('');
  const [imageUrl, setImageUrl] = useState();

  const generateImages = async () => {
    const imageParameters = {
      prompt: userPrompt + theme,
    };
    const response = await openai.createImage(imageParameters);
    const urlData = response.data.data[0].url;
    setImageUrl(urlData);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {imageUrl && (
                  <Navigate to="/generated-images" replace state={{ imageUrl }} />
                )}
                <InputBox label="Description" setAttribute={setUserPrompt} />
                <Themes setTheme={setTheme} />
                <button className="generate-button-main" onClick={generateImages}>
                  Generate
                </button>
              </div>
            }
          />
          <Route
            path="/generated-images"
            element={<GeneratedImage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
