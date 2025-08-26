import { useState } from "react";
import { calculateWinner } from "../utils/calculate-winner";
import { Square } from "../components/square";

export const Game = () => {
  const [xIsNext, setXIsNest] = useState(true);
  const [squares, setSquares] = useState<Array<"X" | "O" | null>>(
    Array(9).fill(null)
  );

  const handleSquareClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNest(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Ganhador: ${winner}`
    : `Próximo jogador: ${xIsNext ? "X" : "O"}`;

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNest(true);
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`mb-4 text-center text-lg font-semibold ${
          winner
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 select-none">
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(0)}
          value={squares[0]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(1)}
          value={squares[1]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(2)}
          value={squares[2]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(3)}
          value={squares[3]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(4)}
          value={squares[4]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(5)}
          value={squares[5]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(6)}
          value={squares[6]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(7)}
          value={squares[7]}
        />
        <Square
          className="h-20"
          onSquareClicked={() => handleSquareClick(8)}
          value={squares[8]}
        />
      </div>

      <button
        onClick={restartGame}
        className="mt-6 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        Reiniciar
      </button>
    </div>
  );
};
