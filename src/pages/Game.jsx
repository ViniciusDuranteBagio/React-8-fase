/*import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
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
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    // always jumping to first index of history
    jumpTo(0);
    setHistory([Array(9).fill(null)]);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <br/>
        <button onClick={resetGame}>Reset Game</button>
      </div>
      <div className="game-info">
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
}*/
import { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning-square' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, gameEnded, winningLine }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || gameEnded) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (gameEnded && winner) {
    status = `Vencedor da rodada: ${winner}`;
  } else if (gameEnded && !winner) {
    status = 'Empate!';
  } else if (winner) {
    status = `Vencedor: ${winner}`;
  } else {
    status = `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square 
          value={squares[0]} 
          onSquareClick={() => handleClick(0)} 
          isWinning={winningLine && winningLine.includes(0)}
        />
        <Square 
          value={squares[1]} 
          onSquareClick={() => handleClick(1)} 
          isWinning={winningLine && winningLine.includes(1)}
        />
        <Square 
          value={squares[2]} 
          onSquareClick={() => handleClick(2)} 
          isWinning={winningLine && winningLine.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square 
          value={squares[3]} 
          onSquareClick={() => handleClick(3)} 
          isWinning={winningLine && winningLine.includes(3)}
        />
        <Square 
          value={squares[4]} 
          onSquareClick={() => handleClick(4)} 
          isWinning={winningLine && winningLine.includes(4)}
        />
        <Square 
          value={squares[5]} 
          onSquareClick={() => handleClick(5)} 
          isWinning={winningLine && winningLine.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square 
          value={squares[6]} 
          onSquareClick={() => handleClick(6)} 
          isWinning={winningLine && winningLine.includes(6)}
        />
        <Square 
          value={squares[7]} 
          onSquareClick={() => handleClick(7)} 
          isWinning={winningLine && winningLine.includes(7)}
        />
        <Square 
          value={squares[8]} 
          onSquareClick={() => handleClick(8)} 
          isWinning={winningLine && winningLine.includes(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [round, setRound] = useState(1);
  const [gameEnded, setGameEnded] = useState(false);
  const [seriesWinner, setSeriesWinner] = useState(null);
  
  const bestOf = 3;
  const winsNeeded = Math.ceil(bestOf / 2);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winnerResult = calculateWinnerWithLine(currentSquares);
  const winner = winnerResult ? winnerResult.winner : null;
  const winningLine = winnerResult ? winnerResult.line : null;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
    // Verifica se o jogo terminou (vitória ou empate)
    const newWinner = calculateWinner(nextSquares);
    const isBoardFull = nextSquares.every(square => square !== null);
    
    if (newWinner || isBoardFull) {
      setGameEnded(true);
      
      // Atualiza o placar se houve vencedor
      if (newWinner === 'X') {
        const newScoreX = scoreX + 1;
        setScoreX(newScoreX);
        if (newScoreX >= winsNeeded) {
          setSeriesWinner('X');
        }
      } else if (newWinner === 'O') {
        const newScoreO = scoreO + 1;
        setScoreO(newScoreO);
        if (newScoreO >= winsNeeded) {
          setSeriesWinner('O');
        }
      }
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function nextRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setGameEnded(false);
    setRound(round + 1);
  }

  function resetSeries() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setGameEnded(false);
    setSeriesWinner(null);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? `Ir para jogada #${move}` : 'Ir para o início';
    return (
      <li key={move}>
        <button 
          onClick={() => jumpTo(move)}
          className={move === currentMove ? 'current-move' : ''}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      
      <div className="game-board">
        <div className="scoreboard">
          <h2>Melhor de {bestOf}</h2>
          <div className="score-display">
            <div className="score-item">
              <div className="player-name">Jogador X</div>
              <div className="score">{scoreX}</div>
            </div>
            <div className="vs">VS</div>
            <div className="score-item">
              <div className="player-name">Jogador O</div>
              <div className="score">{scoreO}</div>
            </div>
          </div>
          <div className="round-info">
            Rodada {round} • Primeiro a vencer {winsNeeded} rodadas
          </div>
        </div>

        {seriesWinner && (
          <div className="series-winner">
            🎉 Jogador {seriesWinner} venceu a série! 🎉
          </div>
        )}

        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay} 
          gameEnded={gameEnded || seriesWinner}
          winningLine={winningLine}
        />

        <div className="game-controls">
          {gameEnded && !seriesWinner && (
            <button className="btn btn-success" onClick={nextRound}>
              Próxima Rodada
            </button>
          )}
          
          {seriesWinner && (
            <button className="btn btn-success" onClick={resetSeries}>
              Nova Série
            </button>
          )}
          
          <button className="btn btn-secondary" onClick={resetSeries}>
            Reiniciar Série
          </button>
        </div>
      </div>

      <div className="game-info">
        <h3>Histórico de Jogadas</h3>
        <div className="moves-history">
          <ol>{moves}</ol>
        </div>
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

function calculateWinnerWithLine(squares) {
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}
