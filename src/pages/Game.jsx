import { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, isGameActive }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || !isGameActive) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Vencedor: ' + winner;
  } else if (squares.every(square => square !== null)) {
    status = 'Empate!';
  } else if (!isGameActive) {
    status = 'Jogo Pausado';
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isGameActive, setIsGameActive] = useState(true);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' ou 'vsbot'
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Timer countdown effect
  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    
    if (!isGameActive || winner || currentSquares.every(square => square !== null)) {
      return;
    }

    if (timer > 0) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      // Timer zerou - executar ação automática
      if (gameMode === 'vsbot' && !xIsNext) {
        // Bot faz jogada automática
        makeBotMove();
      } else {
        // Passa o turno (jogada vazia)
        const nextHistory = [...history.slice(0, currentMove + 1), currentSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setTimer(10);
      }
    }
  }, [timer, isGameActive, currentSquares, gameMode, xIsNext, currentMove, history]);

  // Reset timer when move changes
  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    if (winner || currentSquares.every(square => square !== null)) {
      setIsGameActive(false);
    } else {
      setTimer(10);
    }
  }, [currentMove, currentSquares]);

  // Bot auto-play effect
  useEffect(() => {
    const winner = calculateWinner(currentSquares);
    
    if (gameMode === 'vsbot' && !xIsNext && isGameActive && !winner && !currentSquares.every(square => square !== null)) {
      // Bot joga automaticamente após um pequeno delay
      const botTimer = setTimeout(() => {
        makeBotMove();
      }, 1500); // 1.5 segundos de delay para parecer mais natural
      
      return () => clearTimeout(botTimer);
    }
  }, [currentMove, gameMode, xIsNext, isGameActive, currentSquares]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setTimer(10); // Reset timer após jogada
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setTimer(10);
  }

  function makeBotMove() {
    const availableSquares = currentSquares
      .map((square, index) => square === null ? index : null)
      .filter(val => val !== null);
    
    if (availableSquares.length > 0) {
      const randomIndex = availableSquares[Math.floor(Math.random() * availableSquares.length)];
      const nextSquares = currentSquares.slice();
      nextSquares[randomIndex] = xIsNext ? 'X' : 'O';
      handlePlay(nextSquares);
    }
  }

  function toggleGameMode() {
    setGameMode(gameMode === 'pvp' ? 'vsbot' : 'pvp');
    restartGame();
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setTimer(10);
    setIsGameActive(true);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <div className='game-controls'>
          <button onClick={toggleGameMode}>
            Modo: {gameMode === 'pvp' ? 'Jogador vs Jogador' : 'vs Bot'}
          </button>
          <button onClick={restartGame}>Reiniciar Jogo</button>
        </div>
        
        <div className={`timer-display ${timer <= 3 && isGameActive ? 'timer-low' : ''}`}>
          <h3>Tempo restante: {isGameActive ? timer : 'PAUSADO'}s</h3>
          {!isGameActive && <p>Jogo finalizado!</p>}
        </div>
        
        <div className={`game-board-container ${!isGameActive ? 'paused' : ''}`}>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} isGameActive={isGameActive} />
        </div>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}