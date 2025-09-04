import { useState } from 'react'
import Modes from '../components/Modes'

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
        status = 'Vencedor: ' + winner;
    } else {
        status = 'Próximo: ' + (xIsNext ? 'X' : 'O');
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

let timerId = null;

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [selectedMode, setSelectedMode] = useState('1 v 1');
    const xIsNext = currentMove % 2 === 0;
    const [parts, setParts] = useState([]);
    const currentSquares = history[currentMove];

    const [timeLeft, setTimeLeft] = useState(10);
    const [timerActive, setTimerActive] = useState(false);

    const [roundWins, setRoundWins] = useState({ player1: 0, player2: 0 });
    const [showNextRound, setShowNextRound] = useState(false);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        if (selectedMode === "botEasy" && timerActive) {
            setTimeLeft(10);
        }

        const winner = calculateWinner(nextSquares);
        if (winner) {
            const player = winner === 'X' ? 'Jogador 1' : 'Jogador 2';
            const updatedParts = [...parts, player];
            setParts(updatedParts);
            setShowNextRound(true);
            setTimerActive(false);
            stopTimer();
            setTimeLeft(10);

            if (selectedMode === 'bestOf3') {
                const countPlayer1 = updatedParts.filter(p => p === 'Jogador 1').length;
                const countPlayer2 = updatedParts.filter(p => p === 'Jogador 2').length;

                if (countPlayer1 === 2 || countPlayer2 === 2) {
                    let newRoundWins = { ...roundWins };
                    if (countPlayer1 === 2) newRoundWins.player1 += 1;
                    if (countPlayer2 === 2) newRoundWins.player2 += 1;

                    setRoundWins(newRoundWins);
                    setParts(prev => [...prev, `🏆 ${player} venceu a rodada!`]);

                    if (newRoundWins.player1 === 2 || newRoundWins.player2 === 2) {
                        const champion = newRoundWins.player1 === 2 ? 'Jogador 1' : 'Jogador 2';
                        setParts(prev => [...prev, `🎉 ${champion} venceu a partida!`]);

                        setTimeout(() => {
                            resetGame();
                            setRoundWins({ player1: 0, player2: 0 });
                        }, 3000);
                    } else {
                        setTimeout(() => {
                            setParts([]);
                            resetPart();
                        }, 2000);
                    }
                }
            }
            return;
        }

        if (selectedMode === "botEasy" && xIsNext) {
            const emptyIndices = nextSquares
                .map((val, idx) => (val === null ? idx : null))
                .filter(val => val !== null);

            const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            if (randomIndex !== undefined) {
                const botSquares = nextSquares.slice();
                botSquares[randomIndex] = 'O';

                setTimeout(() => {
                    const botHistory = [...nextHistory, botSquares];
                    setHistory(botHistory);
                    setCurrentMove(botHistory.length - 1);
                    setTimeLeft(10);
                }, 1000);
            }
        }
    }

    function startTimer() {
        if (timerId) return;
        setTimerActive(true);

        if (timeLeft === 0) {
            setTimeLeft(10);
        }

        timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === 0) {
                    autoPlay();
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);
    }

    function stopTimer() {
        setTimerActive(false);
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    function autoPlay() {
        setHistory(prevHistory => {
            const currentSquares = prevHistory[prevHistory.length - 1].slice();

            if (calculateWinner(currentSquares)) return prevHistory;

            const movesPlayed = currentSquares.filter(sq => sq !== null).length;
            const player = movesPlayed % 2 === 0 ? 'X' : 'O';

            const emptyIndices = currentSquares
                .map((val, idx) => (val === null ? idx : null))
                .filter(val => val !== null);

            if (emptyIndices.length === 0) return prevHistory;

            const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

            if (player === 'X') {
                currentSquares[randomIndex] = 'X';
                setCurrentMove(prevHistory.length);
                setTimeLeft(10);
                return [...prevHistory, currentSquares];
            } else {
                setTimeout(() => {
                    const newSquares = currentSquares.slice();
                    newSquares[randomIndex] = 'O';
                    setHistory(prev => [...prev, newSquares]);
                    setCurrentMove(prevHistory.length);
                    setTimeLeft(10);
                }, 1000);
                return prevHistory;
            }
        });
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setParts([]);
        setShowNextRound(false);
        setTimerActive(false);
        stopTimer();
        setTimeLeft(10);
    }

    function resetPart() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setShowNextRound(false);
    }

    function undoMove() {
        if (currentMove > 0) {
            const newHistory = history.slice(0, -1);
            setHistory(newHistory);
            setCurrentMove(newHistory.length - 1);
        }
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Movimento ' + move;
        } else {
            description = 'Início da Partida';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="sidebar left game-mode">
                <Modes
                    selectedMode={selectedMode}
                    onModeChange={setSelectedMode}
                />
            </div>
            <div className="sidebar game-mode">
                <div className="nav-menu nav-button">
                    <h3>
                        Controles
                    </h3>
                    {selectedMode === 'bestOf3' && showNextRound && (
                        <button className="btn btn-secondary" onClick={() => resetPart()}>Próxima Rodada</button>
                    )}
                    {selectedMode === 'botEasy' && (
                        <button className="btn btn-secondary"
                            onClick={() => {
                                if (timerActive) {
                                    stopTimer();
                                } else {
                                    startTimer();
                                }
                            }}
                        > {timerActive ? "Parar Timer" : "Iniciar Timer"}
                        </button>
                    )}
                    <button className="btn btn-secondary" onClick={() => undoMove()}>Voltar Jogada</button>
                    <button className="btn btn-secondary" onClick={() => resetGame()}>Reiniciar Jogo</button>
                </div>
            </div>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            {selectedMode === 'bestOf3' && (
                <>
                    <div className="hero-buttons">
                        <div className="game-info">
                            <h3>Placar Geral</h3>
                            <p>Jogador 1 (X): {roundWins.player1} 🏆 Jogador 2 (O): {roundWins.player2} 🏆</p>
                            <h4>Vitórias da Rodada</h4>
                            <p>Jogador 1: {parts.filter(p => p === 'Jogador 1').length} | Jogador 2: {parts.filter(p => p === 'Jogador 2').length}</p>
                        </div>
                        <div className="game-info">
                            <h3>Partidas</h3>
                            <ol>{parts.map((p, i) => <li key={i}>{p}</li>)}</ol>
                        </div>
                    </div>
                </>
            )}
            {selectedMode === 'botEasy' && (
                <div className="hero-buttons">
                    <div className="game-info">
                        <h3>Tempo</h3>
                        <p>
                            {timerActive ? `Contando: ${timeLeft} segundos` : `Parado: ${timeLeft} segundos`}
                        </p>
                    </div>
                </div>
            )}
            <div className="sidebar right">
                <div className="game-info">
                    <h3>Histórico</h3>
                    <ol>{moves}</ol>
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

export default Game
