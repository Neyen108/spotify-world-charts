import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import MapChart from './MapChart';
import './World.css';

const World = ({ countries }) => {
  const [content, setContent] = useState('');

  return (
    <div className='World'>
      <h1 className='Title'>
        Spotify <span>Top Tracks</span> by Region
      </h1>
      <div className='Subtitle'>
        Hover on a country to see the most streamed track of the day
      </div>
      <MapChart setTooltipContent={setContent} countries={countries} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default World;
