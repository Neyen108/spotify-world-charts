import React, { useEffect, useRef, useState } from 'react';

const TopTracks = (props) => {
  const [item, setItem] = useState('adhvadvhaw');
  console.log('tracks Render ');

  const audioRef = useRef(null);
  const [status, setStatus] = useState('paused');

  const handleClick = (res) => {
    if (res === audioRef.current.src) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = res;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    audioRef.current.src = '';
    audioRef.current.addEventListener('ended', () => {
      audioRef.current.src = '';
      setItem('stopped');
    });
  });

  return (
    <>
      <h1>{item}</h1>

      <img
        src='https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee'
        alt=''
        onClick={() =>
          handleClick(
            'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86'
          )
        }
      />
      <audio ref={audioRef}></audio>

      <img
        src='https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee'
        alt=''
        onClick={() =>
          handleClick(
            'https://p.scdn.co/mp3-preview/3e05f5ed147ca075c7ae77c01f2cc0e14cfad78d?cid=774b29d4f13844c495f206cafdad9c86'
          )
        }
      />
    </>
  );
};

export default TopTracks;

// if (status === 'paused') {
//             audioRef.current.pause();
//             audioRef.current.src =
//               'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86';
//             audioRef.current.play();
//             setStatus('palying');
//           } else {
//             audioRef.current.pause();
//             setStatus('paused');
//           }
//         }
