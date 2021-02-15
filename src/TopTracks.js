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
        <div className='container'>
          <div className='country'>
            The Top 10 most streamed songs in{' '}
            <span>{props.location.state} </span>
          </div>
          <table className='chart-table' style={{ display: 'table' }}>
            <tbody>
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
                    <tr>
                      <td className='track-img'>
                        <img src={imgSrc} alt='' />
                      </td>
                      <td className='position'>
                        <span>{i + 1}</span>
                      </td>
                      <td className='track-details'>
                        <span className='track-name'>{trackName}</span>
                        <br />
                        <span> by {artistName}</span>
                      </td>
                      <td className='utilities'>
                        <button>Preview</button> <br />
                        <button>Listen to full track on Spotify</button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr>
                      <td className='track-img'>
                        <img src={imgSrc} alt='' />
                      </td>
                      <td className='position'>
                        <span>{i + 1}</span>
                      </td>
                      <td className='track-details'>
                        <span className='track-name'>{trackName}</span>
                        <br />
                        <span> by {artistName}</span>
                      </td>
                      <td className='utilities'>
                        <button>Preview</button> <br />
                        <button>Listen to full track on Spotify</button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <audio />
      </>
    );
  }
};

export default TopTracks;
