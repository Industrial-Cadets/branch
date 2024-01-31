import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MazeContext } from '../MazeContext';
import Grid from './Grid';
import { Button, Container, Box, Typography, Paper } from '@mui/material';

const Page2 = () => {
  // ... existing states and useContext ...
  const { num_rows, num_cols, cell_types, setCell_types, useCustomMaze } = useContext(MazeContext);
  const navigate = useNavigate();
  const [gridError, setGridError] = useState('');
  const [customMazeFile, setCustomMazeFile] = useState(null);
  const [customMazeFileError, setCustomMazeFileError] = useState('');

  const handleGridUpdate = (newGrid) => {
    setCell_types(newGrid);
  };

  const handleFileChange = (e) => {
    setCustomMazeFile(e.target.files[0]);
  };

  const handleClearGrid = () => {
    if (useCustomMaze === 'No') {
      const clearedGrid = Array(num_rows).fill().map(() => Array(num_cols).fill(''));
      setCell_types(clearedGrid);
    } else {
      setCustomMazeFile(null);
    }
  };

  const handleNextPage = () => {
    setGridError('');
    setCustomMazeFileError('');

    if (useCustomMaze === 'Yes') {
      if (!customMazeFile) {
        setCustomMazeFileError('Please upload a custom maze file.');
        return; // Stop further execution if validation fails
      }
    } else {
      let startCount = 0, goalCount = 0;
      cell_types.forEach(row => {
        row.forEach(cell => {
          if (cell === 's') startCount++;
          if (cell === 'g') goalCount++;
        });
      });

      if (startCount !== 1 || goalCount !== 1) {
        setGridError('The maze must have exactly one start point (green) and one goal point (red).');
        return; // Stop further execution if validation fails
      }
    }

    // Navigate to the next page if all validations pass
    navigate('/page3');
  };

  return (
    <Container>
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          {useCustomMaze === 'Yes' ? 'Upload Custom Maze' : 'Design Your Maze'}
        </Typography>

        {useCustomMaze === 'No' ? (
          <>
            <Typography variant="subtitle1" style={{ margin: '10px 0' }}>
              Click on a cell to toggle its state: Open (White) → Obstacle (Black) → Start (Green) → Goal (Red).
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center">
              <Paper elevation={3} style={{ padding: '1rem', marginRight: '1rem' }}>
                <Grid 
                  num_rows={num_rows} 
                  num_cols={num_cols} 
                  onGridUpdate={handleGridUpdate} 
                  cell_types={cell_types} 
                />
              </Paper>

              {/* Legend for Grid */}
              <Box marginLeft={2}>
                <Typography variant="subtitle2" gutterBottom>Key:</Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box bgcolor="white" border={1} width={20} height={20} mb={1} />
                  <Typography variant="caption">Open</Typography>
                  <Box bgcolor="black" border={1} width={20} height={20} my={1} />
                  <Typography variant="caption">Obstacle</Typography>
                  <Box bgcolor="green" border={1} width={20} height={20} my={1} />
                  <Typography variant="caption">Start</Typography>
                  <Box bgcolor="red" border={1} width={20} height={20} my={1} />
                  <Typography variant="caption">Goal</Typography>
                </Box>
              </Box>
            </Box>

            {gridError && <Typography color="error" style={{ textAlign: 'center' }}>{gridError}</Typography>}
          </>
        ) : (
          <>
            <input 
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="custom-maze-file"
            />
            <label htmlFor="custom-maze-file">
              <Button variant="contained" component="span" margin="normal">
                Choose Custom Maze
              </Button>
            </label>
            {customMazeFile && <Typography>{customMazeFile.name}</Typography>}
            {customMazeFileError && <Typography color="error">{customMazeFileError}</Typography>}
          </>
        )}

        <Box marginTop={2} display="flex" flexDirection="column" alignItems="center">
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '10px' }} 
            onClick={handleClearGrid}
          >
            Clear
          </Button>
        </Box>

        <Box marginTop={1} display="flex" justifyContent="center">
          <Button variant="outlined" onClick={() => navigate('/page1')} margin="normal">
            Back
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleNextPage}
            style={{ marginLeft: '10px' }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Page2;