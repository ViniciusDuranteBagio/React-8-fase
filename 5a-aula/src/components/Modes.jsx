import { useState } from 'react';

function Modes({ onModeChange }) {
  const [selectedMode, setSelectedMode] = useState('1v1');

  function handleClick(mode) {
    setSelectedMode(mode);
    if (onModeChange) onModeChange(mode);
  }

  return (
    <div className="nav-menu nav-button">
      <h3>Modos de Jogo</h3>
      <button
        className={`btn btn-secondary ${selectedMode === '1v1' ? 'active-mode' : ''}`}
        onClick={() => handleClick('1v1')}
      >
        1 v 1
      </button>
      <button
        className={`btn btn-secondary ${selectedMode === 'bestOf3' ? 'active-mode' : ''}`}
        onClick={() => handleClick('bestOf3')}
      >
        melhor de 3
      </button>
      <button
        className={`btn btn-secondary ${selectedMode === 'botEasy' ? 'active-mode' : ''}`}
        onClick={() => handleClick('botEasy')}
      >
        Bot Fácil
      </button>
    </div>
  );
}

export default Modes;
