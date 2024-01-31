import React, { useContext, useEffect } from 'react';
import { MazeContext } from '../MazeContext'; // Ensure this path is correct

const CellState = {
  OPEN: '.',
  OBSTACLE: '#',
  START: 's',
  GOAL: 'g'
};

const CellColor = {
  '.': 'white',
  '#': 'black',
  's': 'green',
  'g': 'red'
};

const Grid = ({ num_rows, num_cols }) => {
  const { cell_types, setCell_types } = useContext(MazeContext);

  useEffect(() => {
    const initializeGrid = () => {
      if (num_rows > 0 && num_cols > 0) {
        const newGrid = Array(num_rows).fill().map(() => Array(num_cols).fill(CellState.OPEN));
        setCell_types(newGrid);
      } else {
        setCell_types([]);
      }
    };
  
    initializeGrid();
  }, [num_rows, num_cols, setCell_types]);

  const toggleCellState = (row, col) => {
    const newGrid = [...cell_types];
    const currentState = newGrid[row][col];
    const newState = currentState === CellState.OPEN ? CellState.OBSTACLE
                  : currentState === CellState.OBSTACLE ? CellState.START
                  : currentState === CellState.START ? CellState.GOAL
                  : CellState.OPEN;

    newGrid[row][col] = newState;
    setCell_types(newGrid);
  };

  const renderGrid = () => {
    return (
      <div style={{ display: 'flex' }}>
        {cell_types.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', flexDirection: 'column' }}>
            {row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}
                   onClick={() => toggleCellState(rowIndex, colIndex)}
                   style={{
                     width: 20, height: 20,
                     border: '1px solid gray',
                     backgroundColor: CellColor[cell],
                     cursor: 'pointer'
                   }}>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderGrid()}</div>;
};

export default Grid;
