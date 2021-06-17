const path = require('path');
const https = require('https');
const fs = require('fs');
const csv = require('@fast-csv/parse');

const countries = require('./data/countries.json');

const pathToData = path.join(__dirname, 'data', 'spotifyWorldCharts.json');
const pathToUrlData = path.join(__dirname, 'data', 'urlData.json');

const getTopTracksPerCountry = async (country) => {
  let data = [];

  //return the promise

  return new Promise((resolve, reject) => {
    //get the csv file via https GET request
    //parse the response (res) i.e. the csv file
    //store the country data in the data array
    //must contain number, trackname, artist, streams, url
    https.get(
      `https://spotifycharts.com/regional/${country}/daily/latest/download`,
      (res) => {
        csv
          .parseStream(res, { skipRows: 2, maxRows: 10 })
          .on('error', () => reject())
          .on('data', (row) => {
            const obj = {
              number: row[0],
              trackName: row[1],
              artist: row[2],
              streams: row[3],
              url: row[4],
            };

            data = [...data, obj];
          })
          .on('end', () => {
            resolve(data);
          });
      }
    );
  });
};

const getCountriesData = async () => {
  const data = {};
  const urlData = {};

  for (const country of Object.keys(countries)) {
    const countryData = await getTopTracksPerCountry(country);

    if (countryData) {
      data[country.toUpperCase()] = countryData;

      urlData[country.toUpperCase()] = countryData.map((item) => { 
        if(item.url){
        const lastItem = item.url.substring(item.url.lastIndexOf('/') + 1);
        return lastItem;
        }
      });
    }
  }

  fs.writeFileSync(pathToData, JSON.stringify(data));
  fs.writeFileSync(pathToUrlData, JSON.stringify(urlData));
};

getCountriesData();
