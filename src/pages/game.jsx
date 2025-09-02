import { useState, useEffect } from "react";

function Square({ value, onSquareClick, isWinner }) {
  return (
    <button
      className={`square ${isWinner ? "winner" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winningLine, isBoardLocked }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || isBoardLocked) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Vencedor: " + winner.player;
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
          isWinner={winningLine?.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isWinner={winningLine?.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isWinner={winningLine?.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isWinner={winningLine?.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isWinner={winningLine?.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isWinner={winningLine?.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isWinner={winningLine?.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isWinner={winningLine?.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isWinner={winningLine?.includes(8)}
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
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [seriesWinner, setSeriesWinner] = useState(null);
  const [vsBot, setVsBot] = useState(false); // toggle bot mode

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const result = calculateWinner(currentSquares);

  // 👾 BOT JOGADA
  useEffect(() => {
    if (vsBot && !xIsNext && !result && !isBoardLocked) {
      const timeout = setTimeout(() => {
        const emptyIndices = currentSquares
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null);
        if (emptyIndices.length > 0) {
          const randomIndex =
            emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          handlePlay(
            currentSquares.map((sq, i) =>
              i === randomIndex ? "O" : sq
            )
          );
        }
      }, 600); // tempo de "pensar"
      return () => clearTimeout(timeout);
    }
  }, [vsBot, xIsNext, currentSquares, result, isBoardLocked]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
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
  }

  function nextRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setRound(round + 1);
    setIsBoardLocked(false);
  }

  // Checa fim de rodada
  useEffect(() => {
    if (result && !isBoardLocked) {
      setIsBoardLocked(true);
      if (result.player === "X") setScoreX((s) => s + 1);
      if (result.player === "O") setScoreO((s) => s + 1);
    } else if (!result && currentSquares.every(Boolean) && !isBoardLocked) {
      setIsBoardLocked(true); // empate
    }
  }, [result, isBoardLocked, currentSquares]);

  // Checa fim da série
  useEffect(() => {
    if (scoreX > bestOf / 2) {
      setSeriesWinner("X");
    } else if (scoreO > bestOf / 2) {
      setSeriesWinner("O");
    }
  }, [scoreX, scoreO]);

  const moves = history.map((squares, move) => {
    let description =
      move > 0 ? "Ir para jogada #" + move : "Ir para início do jogo";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game-page">
      <h1>Jogo da Velha</h1>

      {/* ✅ Placar */}
      <div className="scoreboard">
        <h2>Placar</h2>
        <p>X: {scoreX} | O: {scoreO}</p>
        <p>Rodada: {round} / {bestOf}</p>
        <label>
          <input
            type="checkbox"
            checked={vsBot}
            onChange={() => setVsBot(!vsBot)}
          />
          Jogar contra Bot (Fácil)
        </label>
      </div>

      {seriesWinner ? (
        <div className="series-result">
          <h2>🏆 Série vencida por {seriesWinner}!</h2>
          <button className="btn btn-reset" onClick={resetGame}>
            Nova Série
          </button>
        </div>
      ) : (
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              winningLine={result?.line}
              isBoardLocked={isBoardLocked}
            />
            <br />
            <button className="btn btn-reset" onClick={resetGame}>
              Reiniciar Série
            </button>
            {isBoardLocked && !seriesWinner && (
              <button className="btn btn-next" onClick={nextRound}>
                Próxima Rodada
              </button>
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
