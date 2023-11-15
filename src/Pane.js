import React, { useState } from 'react';

const Pane = ({ title }) => {
  const getBackgroundImage = (title) => {
    switch (title) {
      case 'Forest':
        return 'url(/images/forest.jpg)';
      case 'Beach':
        return 'url(/images/beach.jpg)';
      case 'Countryside':
        return 'url(/images/countryside.jpg)';
      case 'Park':
        return 'url(/images/park.jpg)';
      case 'Urban':
        return 'url(/images/urban.jpg)';
      default:
        return 'none';
    }
  };

  const [activeSounds, setActiveSounds] = useState({});
  const [volume, setVolume] = useState({});

  const playSound = (sound) => {
    let audio = new Audio(`/sounds/${sound}.mp3`);
    audio.loop = true;
    audio.volume = volume[sound] || 0.5;

    if (!activeSounds[sound]) {
      audio.play();
      setActiveSounds({ ...activeSounds, [sound]: audio });
    } else {
      audio = activeSounds[sound];
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
        setActiveSounds({ ...activeSounds, [sound]: null });
      }
    }
  };

  const handleVolumeChange = (event, sound) => {
    const newVolume = event.target.value;
    setVolume({ ...volume, [sound]: newVolume });
    if (activeSounds[sound]) {
      activeSounds[sound].volume = newVolume;
    }
  };

  const paneStyle = {
    width: '90vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    scrollSnapAlign: 'start',
    flexShrink: 0,
    padding: '20px',
    backgroundImage: getBackgroundImage(title),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: 'white',
    textAlign: 'center',
  };

  const tileContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '20px',
    width: '100%', 
    height: '90%',
  };

  const tileStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'rgba(211, 211, 211, 0.5)',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: '3px solid transparent',
  };

  const activeTileStyle = {
    border: '3px solid green',
  };

  const volumeSliderStyle = {
    width: '80%',
    marginTop: '5px',
    marginBottom: '10px',
    appearance: 'none',
    background: 'linear-gradient(to right, #ddd, #ddd)',
    height: '5px',
    borderRadius: '5px',
    outline: 'none',
    pointerEvents: 'none', // Disable pointer events on the volume slider
  };
  
  const volumeSliderThumb = {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: '#555',
    cursor: 'pointer',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    pointerEvents: 'auto', // Enable pointer events on the slider thumb
  };

  const tiles = {
    Forest: ['wind', 'crickets', 'river', 'frogs', 'rain'],
    Beach: ['waves', 'seagulls', 'storm', 'boat', 'rain'],
    Countryside: ['hens', 'stream', 'wind', 'rain', 'birds'],
    Park: ['fountain', 'kids', 'birds', 'duck', 'dog'],
    Urban: ['traffic', 'people', 'wind', 'rain', 'police'],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={paneStyle}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, marginBottom: '10px' }}>{title}</h2>
        <div style={tileContainerStyle}>
          {tiles[title].map((sound, index) => (
            <div key={index}>
              <div
                style={{ ...tileStyle, ...(activeSounds[sound] ? activeTileStyle : {}) }}
                onClick={() => playSound(sound)}
              >
                {sound}
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume[sound] || 0.5}
                style={volumeSliderStyle}
                onChange={(event) => handleVolumeChange(event, sound)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pane;
