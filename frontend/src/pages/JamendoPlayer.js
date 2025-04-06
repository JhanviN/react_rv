import React, { useState } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import { useLocation } from "react-router-dom";
import 'react-h5-audio-player/lib/styles.css';
import './JamendoPlayer.css'; // Custom styles

const JamendoPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const client_id = 'bca2f8fa';
  
  const searchTracks = async () => {
    try {
      const response = await axios.get('https://api.jamendo.com/v3.0/tracks/', {
        params: {
          client_id,
          format: 'json',
          limit: 10,
          search: searchQuery,
          audioformat: 'mp32',
        },
      });
      setTracks(response.data.results);
      setCurrentTrackIndex(0);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const handlePlay = (index) => setCurrentTrackIndex(index);
  const handlePrevious = () => setCurrentTrackIndex(prev => prev > 0 ? prev - 1 : tracks.length - 1);
  const handleNext = () => setCurrentTrackIndex(prev => prev < tracks.length - 1 ? prev + 1 : 0);
  const addToPlaylist = (track) => {
    if (!playlist.find(t => t.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className={isDarkMode ? 'container dark' : 'container'}>
      <div className="header">
        <h2>🎵 Rhythmic Vibes</h2>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for songs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchTracks}>Search</button>
      </div>

      <div className="content">
        <div className="track-list">
          {tracks.map((track, index) => (
            <div key={track.id} className="track-item">
              <img src={track.album_image || track.image} alt="cover" />
              <div>
                <strong>{track.name}</strong><br />
                <small>{track.artist_name}</small>
              </div>
              <button onClick={() => handlePlay(index)}>Play</button>
              <button onClick={() => addToPlaylist(track)}>➕</button>
            </div>
          ))}
        </div>

        <div className="playlist-section">
          <h4>🎧 My Playlist</h4>
          <ul>
            {playlist.map((track) => (
              <li key={track.id}>{track.name} - {track.artist_name}</li>
            ))}
          </ul>
        </div>
      </div>

      {currentTrack && (
        <div className="audio-player">
          <h3>Now Playing: {currentTrack.name} - {currentTrack.artist_name}</h3>
          <AudioPlayer
            src={currentTrack.audio}
            autoPlay
            showJumpControls
            loop={isLoop}
            onEnded={handleNext}
          />
          <div className="controls">
            <button onClick={handlePrevious}>⏮ Prev</button>
            <button onClick={handleNext}>⏭ Next</button>
            <button onClick={() => setIsShuffle(!isShuffle)}>
              {isShuffle ? '🔀 Shuffle On' : 'Shuffle Off'}
            </button>
            <button onClick={() => setIsLoop(!isLoop)}>
              {isLoop ? '🔁 Loop On' : 'Loop Off'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JamendoPlayer;
