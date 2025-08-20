interface ISquareProps {
  value: string;
  onSquareClicked: () => void;
}

export const Square = ({ value, onSquareClicked }: ISquareProps) => {
  return (
    <button className="square" onClick={onSquareClicked}>
      {value}
    </button>
  );
};
