import { useState } from 'react';
import './App.css';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function Board({squares, onSquareClick}) {
  const handleClick = (i) => {
    if(squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = calculateNextMove(squares); // Tambahkan ini untuk menghitung langkah berikutnya
    onSquareClick(nextSquares);
  };

  const calculateNextMove = (squares) => {
    return squares.filter(square => square === null).length % 2 === 0 ? 'X' : 'O';
  };

  return (
    <div className='board'>
      {squares.map((value, index) => (
        <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
      ))}
    </div>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handleSquareClick = (nextSquares) => {
    const nextHistory = history.slice(0, currentMove + 1);
    setHistory([...nextHistory, nextSquares]);
    setCurrentMove(nextHistory.length);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    const description = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const winner = calculateWinner(currentSquares);
  let status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={currentSquares} onSquareClick={handleSquareClick} />
      </div>
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol>{moves}</ol>
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

  for(let i = 0; i < lines.length; i++){
    const[a, b, c] = lines[i];

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null; // Tambahkan ini untuk menangani kondisi jika tidak ada pemenang
}
