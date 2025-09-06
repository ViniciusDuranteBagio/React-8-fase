import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick} disabled={!!value}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, onRoundEnd, roundFinished }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i] || roundFinished) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = 'Vencedor da rodada: ' + winner;
    onRoundEnd(winner);
  } else if (!squares.includes(null)) {
    status = 'Empate!';
    onRoundEnd(null);
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
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

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [round, setRound] = useState(1);
  const bestOf = 3;
  const [roundFinished, setRoundFinished] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetBoard() {
    jumpTo(0);
    setHistory([Array(9).fill(null)]);
    setRoundFinished(false);
  }

  function resetGame() {
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setGameOver(false);
    resetBoard();
  }

  function handleRoundEnd(winner) {
    if (roundFinished) return;

    setRoundFinished(true);
    if (winner === 'X') setScoreX(scoreX + 1);
    if (winner === 'O') setScoreO(scoreO + 1);

    if (winner) {
      if ((winner === 'X' && scoreX + 1 >= 2) || (winner === 'O' && scoreO + 1 >= 2)) {
        setGameOver(true);
      }
    }
  }

  return (
    <div className="game-page">
      <h1>Jogo da Velha</h1>
      <div className="scoreboard">
        <p>Rodada: {round} / {bestOf}</p>
        <p>Placar - X: {scoreX} | O: {scoreO}</p>
      </div>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            onRoundEnd={handleRoundEnd}
            roundFinished={roundFinished}
          />
          <br />
          {!gameOver && roundFinished && (
            <button className="btn btn-next" onClick={() => { setRound(round + 1); resetBoard(); }}>
              Próxima Rodada
            </button>
          )}
          {gameOver && (
            <div>
              <h2>Fim de Jogo! {scoreX > scoreO ? 'X venceu a série!' : 'O venceu a série!'}</h2>
              <button className="btn btn-reset" onClick={resetGame}>Reiniciar Série</button>
            </div>
          )}
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
