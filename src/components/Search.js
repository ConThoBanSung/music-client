import React, { useState } from 'react';
import axios from 'axios';
import { useMusicPlayer } from '../MusicPlayerContext';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { playTrack } = useMusicPlayer();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://backend-e154.onrender.com/search', {
        params: { query }
      });
      setResults(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlay = (result) => {
    playTrack({
      title: result.snippet.title,
      description: result.snippet.description,
      thumbnail: result.snippet.thumbnails.default.url,
      url: `https://backend-e154.onrender.com/audio/${result.id.videoId}`
    });
    navigate(`/audio`);
  };

  const addToPlaylist = async (videoId) => {
    try {
      const response = await axios.post(
        'https://backend-e154.onrender.com/playlist',
        { songId: videoId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('Song added to playlist', response.data);
    } catch (error) {
      console.error('Error adding song to playlist', error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to SecGei Music</h1>
      <p>Explore the best music collection.</p>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for music"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div>
        {results.map(result => (
          <div key={result.id.videoId}>
            <h3>{result.snippet.title}</h3>
            <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
            <button onClick={() => handlePlay(result)}>Play</button>
            <button onClick={() => addToPlaylist(result.id.videoId)}>Add to Playlist</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
