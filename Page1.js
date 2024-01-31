import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MazeContext } from '../MazeContext';
import { 
  FormControl, TextField, Button, Select, MenuItem, Box, Container, Typography, 
  InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel
} from '@mui/material';

function Page1() {
  const {
    maze_type, setMaze_type,
    num_rows, setNum_rows,
    num_cols, setNum_cols,
    useCustomMaze, setUseCustomMaze
  } = useContext(MazeContext);

  const [mazeTypeError, setMazeTypeError] = useState('');
  const [numRowsError, setNumRowsError] = useState('');
  const [numColsError, setNumColsError] = useState('');
  const [useCustomMazeError, setUseCustomMazeError] = useState('');

  const navigate = useNavigate();

  const handleClear = () => {
    setMaze_type('');
    setNum_rows('');
    setNum_cols('');
    setUseCustomMaze('');
  };

  const handleMazeTypeChange = (e) => {
    const newMazeType = e.target.value;
    setMaze_type(newMazeType);

    if (newMazeType === 'preset' || maze_type === 'preset') {
      setNum_rows('');
      setNum_cols('');
    }

    if (newMazeType !== 'custom') {
      setUseCustomMaze('');
    }
  };

  const handleUseCustomMazeChange = (e) => {
    const newUseCustomMaze = e.target.value;
    setUseCustomMaze(newUseCustomMaze);

    if (newUseCustomMaze === 'Yes') {
      setNum_rows('');
      setNum_cols('');
    }
  };

  const validateDimensions = () => {
    let isValid = true;

    if (!num_rows) {
      setNumRowsError('Please enter the number of rows.');
      isValid = false;
    } else if (num_rows <= 0) {
      setNumRowsError('Number of rows must be greater than 0.');
      isValid = false;
    } else if (maze_type === 'preset' && num_rows % 2 === 0) {
      setNumRowsError('For preset mazes, the number of rows must be an odd number.');
      isValid = false;
    }

    if (!num_cols) {
      setNumColsError('Please enter the number of columns.');
      isValid = false;
    } else if (num_cols <= 0) {
      setNumColsError('Number of columns must be greater than 0.');
      isValid = false;
    } else if (maze_type === 'preset' && num_cols % 2 === 0) {
      setNumColsError('For preset mazes, the number of columns must be an odd number.');
      isValid = false;
    }
    return isValid;
  };

  const handleNextPage = () => {
    let isValid = true;
    setMazeTypeError('');
    setNumRowsError('');
    setNumColsError('');
    setUseCustomMazeError('');

    if (!maze_type) {
      setMazeTypeError('Please select a maze type.');
      isValid = false;
    }

    if (maze_type === 'custom') {
      if (!useCustomMaze) {
        setUseCustomMazeError('Please specify if you want to use a custom maze.');
        isValid = false;
      } else if (useCustomMaze === 'No') {
        isValid = validateDimensions();
      }
    } else {
      isValid = validateDimensions();
    }

    if (isValid) {
      if (maze_type === 'preset') {
        navigate('/page3');
      } else {
        navigate('/page2');
      }
    }
  };

  return (
    <Container>
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Configure Maze
        </Typography>
  
        <FormControl fullWidth margin="normal" error={!!mazeTypeError}>
          <InputLabel id="maze-type-label">Maze Type</InputLabel>
          <Select
            labelId="maze-type-label"
            label="Maze Type"
            value={maze_type}
            onChange={handleMazeTypeChange}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
            <MenuItem value="preset">Preset</MenuItem>
          </Select>
          {mazeTypeError && <Typography color="error">{mazeTypeError}</Typography>}
        </FormControl>
  
        {maze_type === 'custom' && (
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Would you like to use a previously designed custom maze?</FormLabel>
            <RadioGroup
              row
              name="useCustomMaze"
              value={useCustomMaze}
              onChange={handleUseCustomMazeChange}
              style={{ justifyContent: 'center' }}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
            {useCustomMazeError && <Typography color="error" style={{ textAlign: 'center' }}>{useCustomMazeError}</Typography>}
          </FormControl>
        )}

        {(maze_type === 'preset' || (maze_type === 'custom' && useCustomMaze === 'No')) && (
          <>
            <TextField
              type="number"
              value={num_rows}
              onChange={(e) => setNum_rows(parseInt(e.target.value) || '')}
              label="Number of Rows"
              fullWidth
              margin="normal"
              error={!!numRowsError}
              helperText={numRowsError}
            />
  
            <TextField
              type="number"
              value={num_cols}
              onChange={(e) => setNum_cols(parseInt(e.target.value) || '')}
              label="Number of Columns"
              fullWidth
              margin="normal"
              error={!!numColsError}
              helperText={numColsError}
            />
          </>
        )}
  
        <Box marginTop={2} display="flex" flexDirection="column" alignItems="center">
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '10px' }} 
            onClick={handleClear}
          >
            Clear
          </Button>
        </Box>
  
        <Box marginTop={1} display="flex" justifyContent="center">
          <Button variant="outlined" onClick={() => navigate('/mazehomepage')} margin="normal">
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
}

export default Page1;