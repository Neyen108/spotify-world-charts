import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import MapChart from './MapChart';
import './World.css';

const World = ({ countries, setCountryid }) => {
  const [content, setContent] = useState('');

  return (
    <div className='World'>
      <h1 className='Title'>
        Spotify <span>Top Tracks</span> by Region
      </h1>

      <div className='Subtitle'>
        Hover/Tap on a country to see the <span>Top 10</span> most streamed
        tracks of the day
      </div>
      <MapChart
        setTooltipContent={setContent}
        countries={countries}
        setCountryid={setCountryid}
      />
      <ReactTooltip html={true}>{content}</ReactTooltip>

      <footer>
        <p className='footer'>
          Made by <span> Nayanjeet Saikia </span>
          <a href='https://www.linkedin.com/in/nayanjeet-saikia/'>
            <i class='fab fa-linkedin'></i>
          </a>
          <a href='https://www.instagram.com/nayanjeet_/'>
            <i class='fab fa-instagram-square'></i>
          </a>
          <a href='https://twitter.com/Nayanjeet8'>
            <i class='fab fa-twitter'></i>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default World;
