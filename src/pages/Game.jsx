import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
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

import { useEffect, useRef } from 'react';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [round, setRound] = useState(1);
  const bestOf = 3;
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isVsBot, setIsVsBot] = useState(false);
  const [timer, setTimer] = useState(10);
  const [seriesWinner, setSeriesWinner] = useState(null);
  const timerRef = useRef();

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Função para resetar o tabuleiro para próxima rodada
  function nextRound() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsGameOver(false);
    setWinner(null);
    setTimer(10);
    setRound(r => r + 1);
  }

  // Função para resetar toda a série
  function resetSeries() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScoreX(0);
    setScoreO(0);
    setRound(1);
    setIsGameOver(false);
    setWinner(null);
    setSeriesWinner(null);
    setTimer(10);
  }

  // Função para alternar modo bot
  function toggleBot() {
    setIsVsBot(v => !v);
    resetSeries();
  }

  // Efeito para timer por jogada
  useEffect(() => {
    if (isGameOver || seriesWinner) return;
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentMove, isGameOver, seriesWinner]);

  // Função chamada quando o tempo acaba
  function handleTimeout() {
    if (isGameOver || seriesWinner) return;
    if (isVsBot && !xIsNext) {
      botMove();
    } else {
      const nextHistory = [...history.slice(0, currentMove + 1), currentSquares.slice()];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  }

  // Função para jogada do bot fácil
  function botMove() {
    if (isGameOver || seriesWinner) return;
    const empty = currentSquares.map((v, i) => v === null ? i : null).filter(v => v !== null);
    if (empty.length === 0) return;
    setTimeout(() => {
      const idx = empty[Math.floor(Math.random() * empty.length)];
      handlePlay(currentSquares.map((v, i) => i === idx ? 'O' : v));
    }, 700);
  }

  function handlePlay(nextSquares) {
    if (isGameOver || seriesWinner) return;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Detecta vencedor/empate e controla placar/rodada
  useEffect(() => {
    const win = calculateWinner(currentSquares);
    if (win && !isGameOver) {
      setWinner(win);
      setIsGameOver(true);
      if (win === 'X') setScoreX(s => s + 1);
      if (win === 'O') setScoreO(s => s + 1);
    } else if (!currentSquares.includes(null) && !win && !isGameOver) {
      setWinner('Empate');
      setIsGameOver(true);
    }
  }, [currentSquares]);

  // Detecta fim da série (melhor de 3)
  useEffect(() => {
    if (scoreX === 2) setSeriesWinner('X');
    if (scoreO === 2) setSeriesWinner('O');
  }, [scoreX, scoreO]);

  // Bot joga automaticamente se for a vez dele
  useEffect(() => {
    if (isVsBot && !xIsNext && !isGameOver && !seriesWinner) {
      botMove();
    }
  }, [xIsNext, isVsBot, isGameOver, seriesWinner, currentSquares]);

  // Renderização dos botões e placar
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div style={{ marginBottom: 8 }}>
          <button onClick={toggleBot} disabled={seriesWinner !== null}>
            {isVsBot ? 'Modo 2 Jogadores' : 'Modo vs Bot'}
          </button>
        </div>
        <div>Placar: X {scoreX} - {scoreO} O</div>
        <div>Rodada: {round} / {bestOf}</div>
        <div>Timer: {timer}s</div>
        {seriesWinner && (
          <div style={{ color: 'green', fontWeight: 'bold', margin: 8 }}>
            Vencedor da série: {seriesWinner}
            <button onClick={resetSeries} style={{ marginLeft: 8 }}>Reiniciar Série</button>
          </div>
        )}
        {isGameOver && !seriesWinner && (
          <div style={{ margin: 8 }}>
            <span>{winner === 'Empate' ? 'Empate!' : `Vencedor da rodada: ${winner}`}</span>
            <button onClick={nextRound} style={{ marginLeft: 8 }}>Próxima rodada</button>
          </div>
        )}
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