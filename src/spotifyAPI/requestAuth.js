import SpotifyCredentials from '../constants/constants';
import axios from 'axios';

//request authentication
export const requestAuth = async () => {
  //POST request to api/token endpoint
  return axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        btoa(
          SpotifyCredentials.clientId + ':' + SpotifyCredentials.clientSecret
        ),
    },

    data: 'grant_type=client_credentials',
    method: 'POST',
  }).then((tokenResponse) => {
    console.log(tokenResponse.data);

    const expiryTime =
      new Date().getTime() + tokenResponse.data.expires_in * 1000;

    localStorage.setItem('params', JSON.stringify(tokenResponse.data));
    localStorage.setItem('expiry_time', JSON.stringify(expiryTime));
  });
};
