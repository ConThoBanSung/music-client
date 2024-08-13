import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get('https://backend-e154.onrender.com/playlists', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist', error);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <div>
      <h2>My Playlist</h2>
      <ul>
        {playlist.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
