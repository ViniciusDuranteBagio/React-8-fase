import { useState } from "react";
import "./index.css";

function Square({ value, onClick, disabled, isWinning }) {
  return (
    <button
      className={"square" + (isWinning ? " winning" : "")}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], line: [a,b,c] };
    }
  }
  return { winner: null, line: null };
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [round, setRound] = useState(1);
  const bestOf = 3;

  const { winner, line } = calculateWinner(squares);
  const full = squares.every(Boolean);
  const roundOver = Boolean(winner) || full;
  const needed = Math.ceil(bestOf / 2);
  const seriesOver = scoreX === needed || scoreO === needed;

  function handleClick(i) {
    if (squares[i] || roundOver || seriesOver) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function nextRound() {
    if (!roundOver || seriesOver) return;
    if (winner === "X") setScoreX((s) => s + 1);
    if (winner === "O") setScoreO((s) => s + 1);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setRound((r) => r + 1);
  }

  function resetSeries() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setScoreX(0);
    setScoreO(0);
    setRound(1);
  }

  let status = seriesOver
    ? scoreX > scoreO ? "Série: X venceu" : "Série: O venceu"
    : winner
    ? "Vencedor da rodada: " + winner
    : full
    ? "Empate"
    : "Próximo: " + (xIsNext ? "X" : "O");

  function renderSquare(i) {
    const w = line && line.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => handleClick(i)}
        disabled={roundOver || seriesOver}
        isWinning={w}
      />
    );
  }

  return (
    <div className="game simple">
      <div className="scorebar">
        <div className="score">
          <span className="badge">X</span>
          <span className="pts">{scoreX}</span>
        </div>
        <div className="seriesinfo">
          <div>Rodada {round}</div>
          <div>Melhor de {bestOf}</div>
        </div>
        <div className="score">
          <span className="badge">O</span>
          <span className="pts">{scoreO}</span>
        </div>
      </div>

      <div className="status">{status}</div>

      <div className="board">
        <div className="board-row">{[0,1,2].map(renderSquare)}</div>
        <div className="board-row">{[3,4,5].map(renderSquare)}</div>
        <div className="board-row">{[6,7,8].map(renderSquare)}</div>
      </div>

      <div className="actions">
        {roundOver && !seriesOver && (
          <button className="primary" onClick={nextRound}>Próxima rodada</button>
        )}
        {seriesOver ? (
          <button className="primary" onClick={resetSeries}>Reiniciar série</button>
        ) : (
          <button onClick={() => { setSquares(Array(9).fill(null)); setXIsNext(true); }}>Reiniciar rodada</button>
        )}
      </div>
    </div>
  );
}
