import { useState } from "react";

function Square({ value, onSquareClick, disabled }) {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled}>
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
    status = "Vencedor: " + winner;
  } else if (squares.every(Boolean)) {
    status = "Empate!";
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          disabled={disabled}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          disabled={disabled}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          disabled={disabled}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          disabled={disabled}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          disabled={disabled}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          disabled={disabled}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          disabled={disabled}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          disabled={disabled}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          disabled={disabled}
        />
      </div>
    </>
  );
}

export default function Game() {
  const bestOf = 3;
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [roundFinished, setRoundFinished] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(Boolean);

  // Detecta fim de rodada
  if (!roundFinished && (winner || isDraw)) {
    setRoundFinished(true);
    if (winner === "X") setScoreX((s) => s + 1);
    if (winner === "O") setScoreO((s) => s + 1);
    // Checa se alguém venceu a série
    if (
      (winner === "X" && scoreX + 1 === Math.ceil(bestOf / 2)) ||
      (winner === "O" && scoreO + 1 === Math.ceil(bestOf / 2))
    ) {
      setGameOver(true);
    }
    if (isDraw && round === bestOf) setGameOver(true);
  }

  function handlePlay(nextSquares) {
    if (roundFinished || gameOver) return;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    if (roundFinished || gameOver) return;
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setGameOver(false);
    setRoundFinished(false);
  }

  function nextRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setRound((r) => r + 1);
    setRoundFinished(false);
  }

  const moves = history.map((squares, move) => {
    let description =
      move > 0 ? "Ir para jogada #" + move : "Ir para início do jogo";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          disabled={roundFinished || gameOver}
        >
          {description}
        </button>
      </li>
    );
  });

  let seriesStatus = "";
  if (gameOver) {
    if (scoreX > scoreO) seriesStatus = "🏆 X venceu a série!";
    else if (scoreO > scoreX) seriesStatus = "🏆 O venceu a série!";
    else seriesStatus = "Série empatada!";
  }

  return (
    <div className="game-page">
      <h1>Jogo da Velha</h1>
      <div className="scoreboard-container">
        <div className="scoreboard">
          <span className="score-x">X</span>
          <span className="score-value score-x-bg">{scoreX}</span>
          <span className="score-vs">vs</span>
          <span className="score-value score-o-bg">{scoreO}</span>
          <span className="score-o">O</span>
        </div>
        <div className="scoreboard-round">
          Rodada <span className="score-x">{round}</span> de{" "}
          <span className="score-o">{bestOf}</span>
        </div>
      </div>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            disabled={roundFinished || gameOver}
          />
          <br />
          {gameOver ? (
            <>
              <div className="status" style={{ marginBottom: 10 }}>
                {seriesStatus}
              </div>
              <button className="btn btn-reset" onClick={resetGame}>
                Reiniciar Série
              </button>
            </>
          ) : roundFinished ? (
            <button
              className="btn btn-primary"
              onClick={nextRound}
              disabled={round > bestOf}
            >
              Próxima rodada
            </button>
          ) : (
            <button className="btn btn-reset" onClick={resetGame}>
              Reiniciar Série
            </button>
          )}
        </div>
        <div className="game-info">
          <h3>Histórico de Jogadas</h3>
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
