import './TopTracks.css';
import React, { useEffect, useRef, useState } from 'react';
import { getTracksData } from './spotifyAPI/requestTopTracks';

import Loader from './Loader';

const TopTracks = (props) => {
  const [tracksData, setTracksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setTracksData(
      (await getTracksData(props.trackIds[props.location.state])).tracks
    );
    setLoading(false);
  }, []);

  console.log(tracksData);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  } else {
    return (
      <>
        <div>
          {tracksData.map((track, i) => {
            const imgSrc = track.album.images[1].url;
            const trackName = track.name;
            const artistName = track.artists[0].name;
            const album = track.album.name;
            const albumType = track.album.album_type;
            const previewUrl = track.preview_url;
            const spotifyTrackUrl = track.external_urls.spotify;
            const albumUrl = track.album.external_urls.spotify;

            if (previewUrl) {
              return (
                <div className='track-container'>
                  <img src={imgSrc} alt={trackName} className='track-img' />
                  <div className='track-details'>
                    <h4>Track : {trackName}</h4>
                    <h4>Artist : {artistName}</h4>
                    <h4>
                      <a href={albumUrl}>Album : {album}</a>
                    </h4>
                    <h4>Album Type : {albumType}</h4>
                    <h4>Track : {trackName}</h4>
                    <button className='btn'>Preview</button>
                    <a href={spotifyTrackUrl}>
                      Listen to full track on spotify
                    </a>
                  </div>
                </div>
              );
            } else {
              return (
                <div className='track-container'>
                  <img src={imgSrc} alt={trackName} className='track-img' />
                  <div className='track-details'>
                    <p>Track : {trackName}</p>
                    <h4>Artist : {artistName}</h4>
                    <h4>
                      <a href={albumUrl}>Album : {album}</a>
                    </h4>
                    <h4>Album Type : {albumType}</h4>
                    <h4>Track : {trackName}</h4>
                    <button className='btn'>No Preview available</button>
                    <a href={spotifyTrackUrl}>
                      Listen to full track on spotify
                    </a>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <audio />
      </>
    );
  }
};

export default TopTracks;
