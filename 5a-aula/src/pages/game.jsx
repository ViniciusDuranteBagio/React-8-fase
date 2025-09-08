import { useState, useEffect, useRef } from "react";

function Square({ value, onSquareClick, disabled }) {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled || value}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, disabled }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || disabled) {
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
  } else if (!squares.includes(null)) {
    status = "Empate!";
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} disabled={disabled} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} disabled={disabled} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} disabled={disabled} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} disabled={disabled} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} disabled={disabled} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} disabled={disabled} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} disabled={disabled} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} disabled={disabled} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} disabled={disabled} />
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

  const [vsBot, setVsBot] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [timer, setTimer] = useState(10);
  const timerRef = useRef(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);
  const isDraw = !winner && !currentSquares.includes(null);
  const gameOver = winner || isDraw;

  // Inicia timer só após a primeira jogada
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    if (timer === 0) {
      if (vsBot && !xIsNext) {
        botMove();
      } else {
        setCurrentMove((prev) => prev + 1); // passa turno
      }
      setTimer(10);
    }

    timerRef.current = setTimeout(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [timer, gameStarted, currentMove, gameOver]);

  // Executa jogada do bot
  useEffect(() => {
    if (vsBot && !xIsNext && !gameOver && gameStarted) {
      const id = setTimeout(() => botMove(), 800);
      return () => clearTimeout(id);
    }
  }, [xIsNext, vsBot, gameOver, gameStarted]);

  function handlePlay(nextSquares) {
    if (!gameStarted) {
      setGameStarted(true); // primeira jogada -> inicia timer
    }
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setTimer(10);
  }

  function botMove() {
    const emptySquares = currentSquares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
    if (emptySquares.length === 0) return;
    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const nextSquares = currentSquares.slice();
    nextSquares[randomIndex] = "O";
    handlePlay(nextSquares);
  }

  function nextRound() {
    if (winner === "X") setScoreX((s) => s + 1);
    else if (winner === "O") setScoreO((s) => s + 1);

    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setRound((r) => r + 1);
    setTimer(10);
    setGameStarted(false);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setTimer(10);
    setGameStarted(false);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? "Ir para jogada #" + move : "Ir para início do jogo";
    return (
      <li key={move}>
        <button onClick={() => setCurrentMove(move)}>{description}</button>
      </li>
    );
  });

  const seriesOver = scoreX === Math.ceil(bestOf / 2) || scoreO === Math.ceil(bestOf / 2);

  return (
    <div className="game-page">
      <h1>Jogo da Velha</h1>

      <div className="scoreboard">
        <p>Rodada {round} de {bestOf}</p>
        <p>⨉ {scoreX} - {scoreO} ⭘</p>
      </div>

      <div className="timer">⏱ Tempo: {gameStarted && !gameOver ? timer : "--"}</div>

      <div className="options">
        <label>
          <input type="checkbox" checked={vsBot} onChange={() => setVsBot(!vsBot)} /> Jogar contra Bot
        </label>
      </div>

      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} disabled={gameOver || seriesOver} />
          <br />
          {!seriesOver && gameOver && (
            <button className="btn btn-next" onClick={nextRound}>Próxima Rodada</button>
          )}
          <button className="btn btn-reset" onClick={resetGame}>Reiniciar Série</button>
        </div>
        <div className="game-info">
          <h3>Histórico de Jogadas</h3>
          <ol>{moves}</ol>
        </div>
      </div>

      {seriesOver && (
        <div className="series-result">
          <h2>🏆 {scoreX > scoreO ? "X venceu a série!" : "O venceu a série!"}</h2>
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
