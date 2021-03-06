import './App.css';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Route, Switch } from 'react-router-dom';

import World from './World';
import Loader from './Loader';
import TopTracks from './TopTracks';

import { getTrackIds } from './utils/getTrackIds';
import { requestAuth } from './spotifyAPI/requestAuth';

function App() {
  //to store the urlData from my repo
  const [urlData, setUrlData] = useState([]);

  const [loading, setLoading] = useState(true);

  //get the countries from my repository
  const { isLoading, data } = useQuery('repoData', async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/Neyen108/spotify-world-charts/master/data/spotifyWorldCharts.json'
    );

    return await res.json();
  });

  useEffect(async () => {
    //request authorization
    await requestAuth();
    setUrlData(await getTrackIds());
    setLoading(false);
  }, []);

  //use the render method for TopTracks, as we are using history.push({}) for passing the country name
  return (
    <>
      <Switch>
        <Route exact path='/'>
          {isLoading ? <Loader /> : <World countries={data} />}
        </Route>

        <Route
          path='/toptracks/:id'
          render={(props) =>
            loading ? <Loader /> : <TopTracks {...props} trackIds={urlData} />
          }
        ></Route>
      </Switch>
    </>
  );
}

export default App;
