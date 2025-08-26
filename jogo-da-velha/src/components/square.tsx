type SquareProps = {
  value: "X" | "O" | null;
  onSquareClicked: () => void;
  className?: string;
};

export const Square = ({
  value,
  onSquareClicked,
  className = "",
}: SquareProps) => {
  return (
    <button
      onClick={onSquareClicked}
      className={`flex items-center justify-center rounded-xl border border-slate-300 bg-white text-2xl font-bold
                  transition hover:bg-slate-50 active:scale-95
                  dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 ${className}`}
    >
      <span
        className={`${
          value === "X"
            ? "text-blue-600 dark:text-blue-400"
            : value === "O"
            ? "text-rose-600 dark:text-rose-400"
            : "text-slate-600 dark:text-slate-200"
        }`}
      >
        {value}
      </span>
    </button>
  );
};
