import './App.css';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Route, Switch } from 'react-router-dom';

import World from './World';
import Loader from './Loader';
import TopTracks from './TopTracks';

function App() {
  //get the countries from my repository
  const { isLoading, data } = useQuery('repoData', async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/Neyen108/spotify-world-charts/master/data/spotifyWorldCharts.json'
    );

    return res.json();
  });

  return (
    <>
      <Switch>
        <Route exact path='/'>
          {isLoading ? <Loader /> : <World countries={data} />}
        </Route>
        <Route path='/toptracks'>
          <TopTracks />
        </Route>
      </Switch>
    </>
  );
}

export default App;

//test push
