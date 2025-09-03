import { useState, useEffect } from 'react'

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick} tabIndex={0}>
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

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [round, setRound] = useState(1);
    const bestOf = 3;
    const [gameOver, setGameOver] = useState(false);
    const [seriesWinner, setSeriesWinner] = useState(null);
    const [boardLocked, setBoardLocked] = useState(false);
    const [vsBot, setVsBot] = useState(false);
    const [botThinking, setBotThinking] = useState(false);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [timer, setTimer] = useState(10);
    const timerActive = !boardLocked && !gameOver && !(vsBot && !xIsNext && botThinking);
    // Reinicia timer a cada jogada ou rodada
    useEffect(() => {
        if (gameOver || boardLocked) {
            setTimer(0);
            return;
        }
        if (!timerActive) return;
        setTimer(10);
    }, [currentMove, round, boardLocked, gameOver, vsBot, xIsNext, botThinking]);

    // Timer countdown
    useEffect(() => {
        if (gameOver || boardLocked) {
            setTimer(0);
            return;
        }
        if (!timerActive) return;
        if (timer === 0) {
            if (vsBot && !xIsNext) {
                // Bot já vai jogar sozinho
                return;
            }
            if (vsBot && xIsNext) {
                // Jogada automática para X (usuário) se tempo zerar
                const emptyIndexes = currentSquares
                    .map((v, i) => (v == null ? i : null))
                    .filter(i => i != null);
                if (emptyIndexes.length > 0) {
                    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
                    const nextSquares = currentSquares.slice();
                    nextSquares[randomIndex] = 'X';
                    handlePlay(nextSquares);
                }
            } else if (!vsBot) {
                // Passa o turno (simula jogada nula) apenas se possível
                if (currentMove < history.length - 1) {
                    setCurrentMove(m => m + 1);
                }
            }
            return;
        }
        const id = setTimeout(() => setTimer(t => t - 1), 1000);
        return () => clearTimeout(id);
    }, [timer, timerActive, vsBot, xIsNext, currentSquares, handlePlay, boardLocked, gameOver, currentMove, history.length]);


    function handlePlay(nextSquares) {
        if (boardLocked || gameOver || botThinking) return;
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        const winner = calculateWinner(nextSquares);
        const isDraw = !winner && nextSquares.every(sq => sq);
        if (winner || isDraw) {
            setBoardLocked(true);
            if (winner) {
                if (winner === 'X') setScoreX(s => s + 1);
                if (winner === 'O') setScoreO(s => s + 1);
            }
        }
    }

    // Bot fácil: joga aleatório quando for a vez dele
    useEffect(() => {
        if (!vsBot || boardLocked || gameOver) return;
        // Bot é sempre O
        if (!xIsNext) {
            setBotThinking(true);
            const emptyIndexes = currentSquares
                .map((v, i) => (v == null ? i : null))
                .filter(i => i != null);
            if (emptyIndexes.length === 0) {
                setBotThinking(false);
                return;
            }
            const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
            setTimeout(() => {
                const nextSquares = currentSquares.slice();
                nextSquares[randomIndex] = 'O';
                handlePlay(nextSquares);
                setBotThinking(false);
            }, 700); // 700ms para simular "pensando"
        }
    }, [vsBot, xIsNext, currentSquares, boardLocked, gameOver]);


    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // Detecta fim de rodada e série
    useEffect(() => {
        const winner = calculateWinner(currentSquares);
        const isDraw = !winner && currentSquares.every(sq => sq);
        if ((winner || isDraw) && !gameOver) {
            setBoardLocked(true);
            // Checa se alguém ganhou a série
            if (scoreX === 1 && winner === 'X') {
                setGameOver(true);
                setSeriesWinner('X');
            } else if (scoreO === 1 && winner === 'O') {
                setGameOver(true);
                setSeriesWinner('O');
            } else if (scoreX === 2) {
                setGameOver(true);
                setSeriesWinner('X');
            } else if (scoreO === 2) {
                setGameOver(true);
                setSeriesWinner('O');
            }
        }
    }, [currentSquares, scoreX, scoreO, gameOver]);

    function nextRound() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setRound(r => r + 1);
        setBoardLocked(false);
    }

    function resetSeries() {
        setScoreX(0);
        setScoreO(0);
        setRound(1);
        setGameOver(false);
        setSeriesWinner(null);
        setBoardLocked(false);
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game game-ui">
            <div className="game-header">
                <div className="scoreboard-ui">
                    Placar — <span className="score-x">X: {scoreX}</span> | <span className="score-o">O: {scoreO}</span> | <span className="score-round">Rodada: {round}/{bestOf}</span>
                </div>
                <div className={"timer-ui" + (timer <= 3 ? " timer-danger" : "")}>⏰ {timer}s</div>
            </div>
            <div className="game-controls">
                <label className="bot-toggle-label">
                    <input type="checkbox" checked={vsBot} onChange={e => setVsBot(e.target.checked)} disabled={round > 1 || scoreX > 0 || scoreO > 0} className="bot-toggle-input" />
                    Jogar contra o Bot
                </label>
                {vsBot && <span className="bot-info">(Você é X, Bot é O)</span>}
            </div>
            <div className="game-board board-ui">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                {botThinking && vsBot && !gameOver && <div className="bot-thinking">Bot pensando...</div>}
            </div>
            <div className="game-info info-ui">
                <h3 className="info-title">Histórico de jogadas</h3>
                <ol>{moves}</ol>
            </div>
            <div className="game-actions">
                {boardLocked && !gameOver && (
                    <button onClick={nextRound} className="btn btn-primary btn-lg">Próxima rodada</button>
                )}
                {gameOver && (
                    <div className="end-series-ui">
                        <h2 className="end-series-title">Fim da série! Vencedor: <span className="end-series-winner">{seriesWinner}</span></h2>
                        <button onClick={resetSeries} className="btn btn-reset btn-lg">Reiniciar série</button>
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

export default Game