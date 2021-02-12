import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const TopTracks = (props) => {
  // console.log(props.location.state);
  console.log(props);
  return (
    <>
      <h1>{props.location.state}</h1>
    </>
  );
};

export default TopTracks;
