import React from 'react';
import { useMusicPlayer } from '../MusicPlayerContext';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const { currentTrack, pauseTrack, resumeTrack, isPlaying } = useMusicPlayer();

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  return (
    <div className="music-player">
      {currentTrack ? (
        <div className="track-info">
          <h1 className="track-title">Now Playing: {currentTrack.title}</h1>
          <div className="description">
            <h2>Description:</h2>
            <p>{currentTrack.description}</p>
          </div>
          <button className="play-pause-button" onClick={handlePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      ) : (
        <h1 className="no-track">No track is playing</h1>
      )}
    </div>
  );
};

export default MusicPlayer;
