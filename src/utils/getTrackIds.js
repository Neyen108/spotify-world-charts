//get track ids from my repo

export const getTrackIds = async () => {
  const data = await fetch(
    'https://raw.githubusercontent.com/Neyen108/spotify-world-charts/master/data/urlData.json'
  );

  return await data.json();
};
