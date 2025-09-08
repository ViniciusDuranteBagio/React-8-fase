import { useState } from 'react';

function Square({ value, onSquareClick, disabled }) {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, gameOver }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || gameOver) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Vencedor: ' + winner;
  } else if (squares.every(Boolean)) {
    status = 'Empate!';
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} disabled={gameOver}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} disabled={gameOver}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} disabled={gameOver}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} disabled={gameOver}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} disabled={gameOver}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} disabled={gameOver}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} disabled={gameOver}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} disabled={gameOver}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} disabled={gameOver}/>
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
  const bestOf = 3;
  const [gameOver, setGameOver] = useState(false);
  const [seriesWinner, setSeriesWinner] = useState(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      if (winner === 'X') setScoreX(scoreX + 1);
      if (winner === 'O') setScoreO(scoreO + 1);
      setGameOver(true);
    } else if (nextSquares.every(Boolean)) {
      setGameOver(true); 
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setSeriesWinner(null);
    setGameOver(false);
  }

  function nextRound() {
    if (scoreX === Math.ceil(bestOf / 2)) {
      setSeriesWinner('X');
    } else if (scoreO === Math.ceil(bestOf / 2)) {
      setSeriesWinner('O');
    } else {
      setRound(round + 1);
      setHistory([Array(9).fill(null)]);
      setCurrentMove(0);
      setGameOver(false);
    }
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? 'Ir para jogada #' + move : 'Ir para início do jogo';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game-page">
      <h1>Jogo da Velha</h1>
      <h2>Rodada {round} / {bestOf}</h2>
      <h3>Placar: Do X {scoreX} - {scoreO} e DO O</h3>

      {seriesWinner ? (
        <div>
          <h2>Vencedor da série: {seriesWinner}</h2>
          <button className="btn btn-reset" onClick={resetGame}>Reiniciar Série</button>
        </div>
      ) : (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} gameOver={gameOver}/>
            <br/>
            {gameOver ? (
              <button className="btn btn-next" onClick={nextRound}>Próxima Rodada</button>
            ) : (
              <button className="btn btn-reset" onClick={resetGame}>Reiniciar Jogo</button>
            )}
          </div>
          <div className="game-info">
            <h3>Histórico de Jogadas</h3>
            <ol>{moves}</ol>
          </div>
        </div>
      )}
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
