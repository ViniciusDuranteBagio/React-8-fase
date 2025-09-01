import { useState, useEffect } from "react";
import Board from "../Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every(square => square !== null)) {
    return 'Draw';
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const bestOf = 3;
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const seriesWinner = scoreX > bestOf / 2 ? 'X' : scoreO > bestOf / 2 ? 'O' : null;

  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        setScoreX(prev => prev + 1);
      } else if (winner === 'O') {
        setScoreO(prev => prev + 1);
      }
    }
  }, [winner]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleNextRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function handleRestartGame() {
    handleNextRound();
    setScoreX(0);
    setScoreO(0);
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

  let status;
  if (seriesWinner) {
    status = `Winner of the series: ${seriesWinner}`;
  } else if (winner) {
    status = winner === 'Draw' ? 'Round is a Draw' : "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{`Score X: ${scoreX} | Score O: ${scoreO}`}</div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winner={winner || seriesWinner} />
        <div className="status">{status}</div>
        {(winner && !seriesWinner) && <button onClick={handleNextRound}>Next Round</button>}
        <button onClick={handleRestartGame}>Restart Game</button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}