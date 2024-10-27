import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import '../css/Minesweeper.scss';

const successMessage = (string) => {
  Swal.fire({
    title: "알림",
    icon:'success',
    html: string,
    showCancelButton: false,
    confirmButtonText: "확인",
  }).then(() => {});
}

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  nearbyMines: number;
};

const generateGrid = (rows: number, cols: number, mines: number): Cell[][] => {
  const grid: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      nearbyMines: 0,
    }))
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!grid[row][col].isMine) {
      grid[row][col].isMine = true;
      placedMines++;
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col].isMine) continue;
      grid[row][col].nearbyMines = countNearbyMines(grid, row, col);
    }
  }

  return grid;
};

const countNearbyMines = (grid: Cell[][], row: number, col: number): number => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], /* cell */ [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];

  return directions.reduce((count, [dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;
    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      return count + (grid[newRow][newCol].isMine ? 1 : 0);
    }
    return count;
  }, 0);
};

const Minesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameCleared, setGameCleared] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [rows, cols, mines] = [15, 15, 30];

  useEffect(() => {
    setGrid(generateGrid(rows, cols, mines));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const startTimer = () => {
    setTimer(0);
    setIsTimerActive(true);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
  };

  const revealCell = (row: number, col: number) => {
    if (grid[row][col].isRevealed || gameOver || gameCleared || grid[row][col].isFlagged) return;

    if (!isTimerActive) startTimer();

    const newGrid = [...grid];
    newGrid[row][col].isRevealed = true;

    if (newGrid[row][col].isMine) {
      setGameOver(true);
      stopTimer();
      revealAllMines(newGrid);
    } else if (newGrid[row][col].nearbyMines === 0) {
      revealEmptyCells(newGrid, row, col);
    }
    setGrid(newGrid);

    checkGameCleared(newGrid);
  };

  const revealAllMines = (newGrid: Cell[][]) => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (newGrid[row][col].isMine) {
          newGrid[row][col].isRevealed = true;
        }
      }
    }
    setGrid(newGrid);
  };

  const revealEmptyCells = (grid: Cell[][], row: number, col: number) => {
    const stack = [[row, col]];
    while (stack.length) {
      const [currentRow, currentCol] = stack.pop()!;
      grid[currentRow][currentCol].isRevealed = true;
      if (grid[currentRow][currentCol].nearbyMines > 0) continue;

      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1],
      ];

      directions.forEach(([dx, dy]) => {
        const newRow = currentRow + dx;
        const newCol = currentCol + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !grid[newRow][newCol].isRevealed && !grid[newRow][newCol].isMine) {
          stack.push([newRow, newCol]);
        }
      });
    }
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || gameCleared || grid[row][col].isRevealed) return;
    const newGrid = [...grid];
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
  };

  const checkGameCleared = (newGrid: Cell[][]) => {
    const allCellsCleared = newGrid.every(row =>
      row.every(cell => cell.isRevealed || (cell.isMine && cell.isFlagged))
    );
    if (allCellsCleared) {
      setGameCleared(true);
      stopTimer();

      successMessage("Clear!");
    }
  };

  const restartGame = () => {
    setGrid(generateGrid(rows, cols, mines));
    setGameOver(false);
    setGameCleared(false);
    setTimer(0);
    setIsTimerActive(false);
  };

  return (
    <div className="minesweeper">
      <h1>{gameOver ? 'Game Over' : gameCleared ? 'You Win!' : 'Minesweeper'}</h1>
      <div className="timer">Time: {timer}s</div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isFlagged ? 'flagged' : ''} ${cell.isMine && cell.isRevealed ? 'mine' : ''}`}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
              >
                {cell.isFlagged ? '🚩' : cell.isRevealed && cell.isMine ? '💣' : cell.isRevealed && cell.nearbyMines > 0 ? cell.nearbyMines : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>Restart</button>
    </div>
  );
};

export default Minesweeper;
