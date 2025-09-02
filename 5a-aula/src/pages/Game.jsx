import { useState } from 'react'

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

function modes() {
    return (
        <>
            <div className="nav-menu nav-button">
                <h3>
                    Modos de Jogo
                </h3>
                <button className='btn btn-secondary'>1 v 1</button>
                <button className='btn btn-secondary'>melhor de 3</button>
                <button className='btn btn-secondary'>Bot Fácil</button>
            </div>
        </>
    );
}

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const [parts, setParts] = useState([]);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        const winner = calculateWinner(nextSquares);
        if (winner) {
            const player = winner === 'X' ? 'Jogador 1' : 'Jogador 2';
            setParts([...parts, player]);
        }
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
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
                {modes()}
            </div>
            <div className="sidebar game-mode">
                <div className="nav-menu nav-button">
                    <h3>
                        Controles
                    </h3>
                    <button className="btn btn-secondary" onClick={() => resetGame()}>Jogar Novamente</button>
                    <button className="btn btn-secondary" onClick={() => undoMove()}>Voltar Jogada</button>
                </div>
            </div>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <h3>Partidas</h3>
                <ol>{parts.map((p, i) => <li key={i}>{p}</li>)}</ol>
            </div>
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
