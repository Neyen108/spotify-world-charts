import axios from 'axios';

//get track data from their trackIds

export const getTracksData = async (trackIds) => {
  //get the stored authorization details
  const params = JSON.parse(localStorage.getItem('params'));

  const access_token = params.access_token;

  //the api needs a comma separated string of the trackIDs
  const trackIdsString = trackIds
    .map((item) => {
      return item.toString();
    })
    .join(',');

  return await axios('https://api.spotify.com/v1/tracks', {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + access_token },
    params: { ids: trackIdsString },
  }).then((tracksResponse) => {
    return tracksResponse.data;
  });
};
