# Spotify World Charts 

Shows Spotify Top Tracks by Region.  
[WebSite](https://spotifyworldcharts.netlify.app/)    
Also plays previews of the Top Ten most streamed songs today, of a region. 

## 🛠 Installing

1. Install dependencies

   ```bash
   npm install
   ```

2. Fire up the server and watch files

   ```bash
   npm start
   ```

## 🚀 Compiles and minifies for production

```bash
npm run build
```

## 🛠 Built with

- [react-simple-maps](https://www.react-simple-maps.io/)
- [spotifycharts.com](https://spotifycharts.com/regional)
- [react-tooltip](https://github.com/wwayne/react-tooltip)
- [React Query](https://react-query.tanstack.com/)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)  
  
## 🛠 Local Development Environment

   To run this project in your own Development Environment.

   ```bash
   Include your own Client Id and Client Secret Key from Spotify Developer API service inside a constants.js file.  
   Put the constants.js file inside a constants folder which is inside the src folder.
   Like this -> /src/constants/constants.js
   ```  
   
   The constants.js file should look like this:
   ```javascript
   const SpotifyCredentials = {
  clientId: 'YOUR CLIENT ID',
  clientSecret: 'YOUR SECRET KEY',
   };
   export default SpotifyCredentials;
   ```
   
   Once set up, run:
   ```bash
   npm install
   npm start
   ```
   And the project should load up.
   
   
