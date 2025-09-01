import { useState, useEffect } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick} disabled={!!value}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, disabled }) {
  function handleClick(i) {
    if (disabled || calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "Empate!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {[0, 1, 2].map((i) => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[3, 4, 5].map((i) => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[6, 7, 8].map((i) => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [roundEnded, setRoundEnded] = useState(false);
  const [round, setRound] = useState(1);
  const bestOf = 3; 

  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && !currentSquares.includes(null);
  const seriesOver = scoreX === 2 || scoreO === 2;

  const xIsNext = currentMove % 2 === 0 && !seriesOver && !roundEnded;

  useEffect(() => {
    if (!roundEnded && (winner || isDraw)) {
      if (winner === "X") setScoreX((s) => s + 1);
      if (winner === "O") setScoreO((s) => s + 1);
      setRoundEnded(true);
    }
  }, [winner, isDraw, roundEnded]);

  function handlePlay(nextSquares) {
    if (roundEnded || seriesOver) return;

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    if (roundEnded || seriesOver) return;
    setCurrentMove(nextMove);
  }

  function nextRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setRound((r) => r + 1);
    setRoundEnded(false);
  }

  function resetSeries() {
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setRoundEnded(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((_, move) => {
    const description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} disabled={roundEnded || seriesOver}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          disabled={roundEnded || seriesOver}
        />
        {roundEnded && !seriesOver && (
          <button style={{ marginTop: 12 }} onClick={nextRound}>
            Próxima rodada
          </button>
        )}
        {seriesOver && (
          <button style={{ marginTop: 12 }} onClick={resetSeries}>
            Reiniciar série
          </button>
        )}
      </div>

      <div className="game-info">
        <div className="status" style={{ marginBottom: 12 }}>
          {seriesOver
            ? `Série encerrada — vencedor: ${scoreX > scoreO ? "X" : "O"}`
            : `Rodada ${round} / Melhor de ${bestOf}`}
        </div>
        <ul>
          <li>Placar X: {scoreX}</li>
          <li>Placar O: {scoreO}</li>
        </ul>
        <hr style={{ margin: "12px 0" }} />
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