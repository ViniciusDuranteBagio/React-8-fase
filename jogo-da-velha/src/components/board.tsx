import { useState } from "react";
import { Square } from "./square";
import { calculateWinner } from "../utils/calculate-winner";

export const Board = () => {
  const [xIsNext, setXIsNest] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleSquareClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNest(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganhador: " + winner;
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNest(true);
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          onSquareClicked={() => handleSquareClick(0)}
          value={squares[0]}
        />
        <Square
          onSquareClicked={() => handleSquareClick(1)}
          value={squares[1]}
        />
        <Square
          onSquareClicked={() => handleSquareClick(2)}
          value={squares[2]}
        />
      </div>
      <div className="board-row">
        <Square
          onSquareClicked={() => handleSquareClick(3)}
          value={squares[3]}
        />
        <Square
          onSquareClicked={() => handleSquareClick(4)}
          value={squares[4]}
        />
        <Square
          onSquareClicked={() => handleSquareClick(5)}
          value={squares[5]}
        />
      </div>
      <div className="board-row">
        <Square
          onSquareClicked={() => handleSquareClick(6)}
          value={squares[6]}
        />
        <Square
          onSquareClicked={() => handleSquareClick(7)}
          value={squares[7]}
        />
        <Square
          onSquareClicked={() => handleSquareClick(8)}
          value={squares[8]}
        />
      </div>
      <button onClick={restartGame}>Reiniciar</button>
    </>
  );
};
