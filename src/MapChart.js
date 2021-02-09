import React, { memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';

import './MapChart.css';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const withCommas = (num) => Intl.NumberFormat().format(num);

const MapChart = ({ setTooltipContent, countries, setCountryid }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  //use the useHistory hook for better future use
  const history = useHistory();

  return (
    <>
      <ComposableMap data-tip=''>
        <ZoomableGroup>
          <Graticule stroke='gray' />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const exist = Object.keys(countries).find(
                  (i) => i === geo.properties.ISO_A2
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke='#D3d3d3'
                    onMouseEnter={() => {
                      const { NAME, ISO_A2 } = geo.properties;

                      if (exist) {
                        ReactTooltip.rebuild();
                        const countryData = countries[ISO_A2].find(
                          (item) => item.number == 1
                        );

                        setTooltipContent(
                          `<span style="font-weight:bold;"> ${NAME} </span> <br/> 
                          Track: <span style="font-weight:bold;"> ${
                            countryData.trackName
                          }</span><br/>
                          Artist: <span style="font-weight:bold;"> ${
                            countryData.artist
                          }</span><br/>
                          Streams: <span style="font-weight:bold;"> ${withCommas(
                            countryData.streams
                          )}</span>`
                        );
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    onClick={() => {
                      if (exist) {
                        setCountryid(`${geo.properties.ISO_A2}`);
                        history.push('/toptracks');
                      }
                    }}
                    style={{
                      default: {
                        fill: exist ? '#1ed65f' : '#000',
                        outline: 'none',
                      },
                      hover: {
                        fill: exist ? '#1ed65f' : '#000',
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
