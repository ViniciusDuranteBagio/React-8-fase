import { useState } from 'react';

function Square({ value, onSquareClick, disabled }) {
  return (
    <button className="square" onClick={onSquareClick} disabled={disabled}>
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
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Vencedor da rodada: ' + winner;
  } else if (squares.every(Boolean)) {
    status = 'Empate!';
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} disabled={disabled}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} disabled={disabled}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} disabled={disabled}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} disabled={disabled}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} disabled={disabled}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} disabled={disabled}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} disabled={disabled}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} disabled={disabled}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} disabled={disabled}/>
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
  const [seriesOver, setSeriesOver] = useState(false);
  const [roundOver, setRoundOver] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winnerNow = calculateWinner(nextSquares);
    if (winnerNow && !roundOver) {
      if (winnerNow === 'X') setScoreX(scoreX + 1);
      if (winnerNow === 'O') setScoreO(scoreO + 1);
      setRoundOver(true);
      checkSeriesEnd(scoreX + (winnerNow === 'X' ? 1 : 0), scoreO + (winnerNow === 'O' ? 1 : 0));
    } else if (!winnerNow && nextSquares.every(Boolean) && !roundOver) {
      // empate -> conta como rodada encerrada, mas sem pontos
      setRoundOver(true);
    }
  }

  function checkSeriesEnd(newScoreX, newScoreO) {
    const winsNeeded = Math.ceil(bestOf / 2);
    if (newScoreX >= winsNeeded || newScoreO >= winsNeeded) {
      setSeriesOver(true);
    }
  }

  function resetBoard() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setRound(round + 1);
    setRoundOver(false);
  }

  function resetSeries() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setSeriesOver(false);
    setRoundOver(false);
  }

  return (
    <div className="game">
      <div className="game-board">
        <h3>Rodada {round} de {bestOf}</h3>
        <h4>Placar: X {scoreX} - {scoreO} O</h4>

        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay} 
          disabled={roundOver || seriesOver}
        />

        <br/>
        {!seriesOver && roundOver && (
          <button className="btn btn-primary" onClick={resetBoard}>
            Próxima Rodada
          </button>
        )}

        {seriesOver && (
          <>
            <h2>
              {scoreX > scoreO ? "X venceu a série!" : "O venceu a série!"}
            </h2>
            <button className="btn btn-primary" onClick={resetSeries}>
              Jogar novamente
            </button>
          </>
        )}

        <button className="btn btn-reset" onClick={resetSeries}>
          Resetar Série
        </button>
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