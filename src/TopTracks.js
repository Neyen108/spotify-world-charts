import './TopTracks.css';
import React, { useEffect, useRef, useState } from 'react';
import { getTracksData } from './spotifyAPI/requestTopTracks';

import Loader from './Loader';

const TopTracks = (props) => {
  const [tracksData, setTracksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('paused');
  const [currentItem, setCurrentItem] = useState(null);
  const [prevItem, setPrevItem] = useState(null);

  const playRefs = useRef({});
  const audioRef = useRef(null);

  const handleClick = (previewUrl, i) => {
    setCurrentItem(i);
    if (previewUrl === audioRef.current.src) {
      if (status === 'paused') {
        setStatus('playing');
      } else if (status === 'playing' || status === 'playNew') {
        setStatus('paused');
      }
    } else if (previewUrl !== audioRef.current.src) {
      audioRef.current.src = previewUrl;
      if (status === 'paused') {
        setStatus('playing');
      } else if (status === 'playing') {
        setStatus('playNew');
      } else if (status === 'playNew') {
        setStatus('playing');
      }
    }
  };

  useEffect(async () => {
    setTracksData(
      (await getTracksData(props.trackIds[props.location.state])).tracks
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentItem !== null) {
      if (status === 'playing') {
        for (let key in playRefs.current) {
          playRefs.current[key].textContent = 'Play';
        }
        playRefs.current[currentItem].textContent = 'Pause';
        audioRef.current.play();
      } else if (status === 'playNew') {
        for (let key in playRefs.current) {
          playRefs.current[key].textContent = 'Play';
        }
        playRefs.current[currentItem].textContent = 'Pause';
        audioRef.current.play();
      } else {
        for (let key in playRefs.current) {
          playRefs.current[key].textContent = 'Play';
        }
        audioRef.current.pause();
      }
      audioRef.current.addEventListener('ended', () => {
        playRefs.current[currentItem].textContent = 'Play';
      });
    }
  }, [status]);

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
                const previewUrl = track.preview_url;
                const spotifyTrackUrl = track.external_urls.spotify;

                if (previewUrl) {
                  return (
                    <tr key={i}>
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
                        <span
                          className='play'
                          ref={(el) => (playRefs.current[i] = el)}
                          onClick={() => handleClick(previewUrl, i)}
                        >
                          Play
                        </span>
                        <a href={spotifyTrackUrl} title='Listen on spotify'>
                          <i className='fab fa-spotify'></i>
                        </a>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={i}>
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
                        <span>Preview Unavailable</span>
                        <a href={spotifyTrackUrl} title='Listen on spotify'>
                          <i className='fab fa-spotify'></i>
                        </a>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <audio ref={audioRef} />
      </>
    );
  }
};

export default TopTracks;
