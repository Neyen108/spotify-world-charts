import React from 'react';

const TopTracks = (props) => {
  console.log(props.location.state);
  return <h1>{props.location.state}</h1>;
};

export default TopTracks;
