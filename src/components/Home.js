import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        // Replace with your client ID and secret
        const clientId = '5997196b69fb40a8941af357708d6e40';
        const clientSecret = '379337f2991f4b729c2587f5b30ebe4a';

        // Get Spotify access token
        const authResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
          params: {
            grant_type: 'client_credentials'
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
          }
        });

        const accessToken = authResponse.data.access_token;

        // Fetch latest tracks
        const tracksResponse = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        setTopSongs(tracksResponse.data.albums.items); // Adjust as per Spotify API response structure
      } catch (error) {
        console.error('Error fetching top tracks from Spotify:', error);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <div className="container-home">
      <h2>Welcome to SoundTiFy Music</h2>
      <p>Explore the best music collection.</p>
      <ul className="nav-links">
        <li><Link to="/music-player">Music Player</Link></li>
        <li><Link to="/playlist">Playlist</Link></li>
      </ul>
      <div className="top-songs">
        <h3>Top Songs</h3>
        <div className="songs-list">
          {topSongs.map((song, index) => (
            <div key={index} className="song-item">
              <img src={song.images[0].url} alt={song.name} />
              <div className="song-details">
                <p>{song.name}</p>
                <p>{song.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="top-songs">
        <h3>Recent play</h3>
        <div className="songs-list">
          {topSongs.map((song, index) => (
            <div key={index} className="song-item">
              <img src={song.images[0].url} alt={song.name} />
              <div className="song-details">
                <p>{song.name}</p>
                <p>{song.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
