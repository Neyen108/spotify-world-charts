import './App.css';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import World from './World';
import Loader from './Loader';

function App() {
  //get the countries from my repository
  const { isLoading, data } = useQuery('repoData', () => {
    fetch(
      'https://raw.githubusercontent.com/Neyen108/spotify-world-charts/main/data/spotifyWorldCharts.json'
    ).then((res) => res.json());
  });

  return <>{isLoading ? <Loader /> : <World countries={data} />}</>;
}

export default App;
