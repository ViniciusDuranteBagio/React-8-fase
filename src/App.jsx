import { useState } from "react";
import "./index.css";

function Square({ value, onClick, isWinning }) {
  return (
    <button className={"square" + (isWinning ? " winning" : "")} onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const { winner } = calculateWinner(squares);
    if (squares[i] || winner) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    onPlay(next, i);
  }

  const { winner, line } = calculateWinner(squares);
  let status = winner
    ? "Vencedor: " + winner
    : squares.every(Boolean)
    ? "Empate"
    : "Próximo: " + (xIsNext ? "X" : "O");

  function renderSquare(i) {
    const win = line && line.includes(i);
    return (
      <Square key={i} value={squares[i]} onClick={() => handleClick(i)} isWinning={win} />
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">{[0, 1, 2].map(renderSquare)}</div>
      <div className="board-row">{[3, 4, 5].map(renderSquare)}</div>
      <div className="board-row">{[6, 7, 8].map(renderSquare)}</div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), last: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [asc, setAsc] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const current = history[currentMove];

  function onPlay(nextSquares, i) {
    const nextHistory = history.slice(0, currentMove + 1).concat([{ squares: nextSquares, last: i }]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((step, move) => {
    const desc =
      move === 0
        ? "Ir para o início"
        : `Ir para jogada #${move} (${(step.last % 3) + 1}, ${Math.floor(step.last / 3) + 1})`;
    const selected = move === currentMove;
    return (
      <li key={move}>
        {selected ? <strong>{desc}</strong> : <button onClick={() => jumpTo(move)}>{desc}</button>}
      </li>
    );
  });

  const orderedMoves = asc ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={current.squares} onPlay={onPlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setAsc(!asc)}>{asc ? "Ordem: asc" : "Ordem: desc"}</button>
        <ol>{orderedMoves}</ol>
        <button
          className="reset"
          onClick={() => {
            setHistory([{ squares: Array(9).fill(null), last: null }]);
            setCurrentMove(0);
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

function calculateWinner(sq) {
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
  for (const [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}
