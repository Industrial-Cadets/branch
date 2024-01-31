import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MazeContext } from '../MazeContext';
import { FormControl, Select, MenuItem, TextField, Button, Container, Box, Typography, InputLabel, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';

function Page3() {
  const {
    provideOwnAgent, setProvideOwnAgent,
    maze_type, agent, setAgent,
    algo_choice, setAlgo_choice, total_timesteps, setTotal_timesteps,
    custom_name, setCustom_name,
    time_delay, setTime_delay
  } = useContext(MazeContext);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const [agentError, setAgentError] = useState('');
  const [algoChoiceError, setAlgoChoiceError] = useState('');
  const [totalTimestepsError, setTotalTimestepsError] = useState('');
  const [fileNameError, setFileNameError] = useState('');
  const [timeDelayError, setTimeDelayError] = useState('');
  const [provideOwnAgentError,  setProvideOwnAgentError] = useState('');

  const handleFileInput = (e) => {
    setAgent(e.target.files[0]);
  };

  const handleClear = () => {
    setAgent(null);
    setAlgo_choice('');
    setTotal_timesteps('');
    setCustom_name('');
    setTime_delay('');
    setProvideOwnAgent('');
  };

  const navigateBack = () => {
    if (maze_type === 'preset') {
      navigate('/page1');
    } else {
      navigate('/page2');
    }
  };

  // New function to reset states based on provideOwnAgent
  const handleProvideOwnAgentChange = (e) => {
    const newProvideOwnAgent = e.target.value;
    setProvideOwnAgent(newProvideOwnAgent);

    if (newProvideOwnAgent === 'Yes') {
      setAlgo_choice('');
      setTotal_timesteps('');
      setCustom_name('');
      setTime_delay('');
    }

    if (newProvideOwnAgent === 'No') {
      setAgent(null);
    }
  };

  const handleNextPage = () => {
    let isValid = true;
    setAgentError('');
    setAlgoChoiceError('');
    setTotalTimestepsError('');
    setProvideOwnAgentError('');
    setFileNameError('');
    setTimeDelayError('');

    if (!provideOwnAgent) {
      setProvideOwnAgentError('Please specify if you will provide your own agent.');
      isValid = false;
    }

    if (provideOwnAgent === 'Yes' && !agent) {
      setAgentError('Please upload an agent file.');
      isValid = false;
    }

    if (provideOwnAgent === 'No') {
      if (!algo_choice) {
        setAlgoChoiceError('Please select an algorithm.');
        isValid = false;
      }
      if (!total_timesteps || total_timesteps <= 0) {
        setTotalTimestepsError('Please enter a valid number of timesteps.');
        isValid = false;
      }
      const fileNameRegex = /^[a-zA-Z0-9_-]+$/;
      if (!custom_name) {
        setFileNameError('Please enter a file name.');
        isValid = false;
      } else if (!fileNameRegex.test(custom_name)) {
        setFileNameError('File name can only contain alphanumeric characters, underscores, and hyphens.');
        isValid = false;
      }

      if (!time_delay) {
        setTimeDelayError('Please enter a time delay.');
        isValid = false;
      } else if (time_delay < 0) {
        setTimeDelayError('Time delay cannot be negative.');
        isValid = false;
      }
    }

    if (isValid) {
      navigate('/page4');
    }
  };

  return (
    <Container>
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Agent and Algorithm Configuration
        </Typography>

        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Would you like to provide your own agent?</FormLabel>
          <RadioGroup
            row
            name="provideOwnAgent"
            value={provideOwnAgent}
            onChange={handleProvideOwnAgentChange}
            style={{ justifyContent: 'center' }}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
          {provideOwnAgentError && <Typography color="error" style={{ marginTop: '8px' }}>{provideOwnAgentError}</Typography>}
        </FormControl>

        {provideOwnAgent === 'Yes' && (
          <>
            <input 
              ref={fileInputRef} 
              type="file" 
              onChange={handleFileInput} 
              style={{ display: 'none' }} 
            />
            <Button variant="contained" onClick={() => fileInputRef.current.click()} margin="normal">
              Choose Agent File
            </Button>
            {agentError && <Typography color="error">{agentError}</Typography>}
          </>
        )}

        {provideOwnAgent === 'No' && (
          <>
            <FormControl fullWidth margin="normal" error={!!algoChoiceError}>
              <InputLabel id="algorithm-select-label">Select Algorithm</InputLabel>
              <Select 
                labelId="algorithm-select-label"
                label="Select Algorithm"
                value={algo_choice} 
                onChange={(e) => setAlgo_choice(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="PPO">PPO</MenuItem>
                <MenuItem value="A2C">A2C</MenuItem>
                <MenuItem value="DQN">DQN</MenuItem>
              </Select>
              {algoChoiceError && <Typography color="error">{algoChoiceError}</Typography>}
            </FormControl>

            <TextField 
              type="number" 
              value={total_timesteps} 
              onChange={(e) => setTotal_timesteps(parseInt(e.target.value) || '')} 
              label="Number of Timesteps"
              fullWidth
              margin="normal"
              error={!!totalTimestepsError}
              helperText={totalTimestepsError}
            />

            <TextField 
              label="File Name"
              value={custom_name}
              onChange={(e) => setCustom_name(e.target.value)}
              fullWidth
              margin="normal"
              error={!!fileNameError}
              helperText={fileNameError}
            />

            <TextField
              type="number"
              value={time_delay}
              onChange={(e) => setTime_delay(parseInt(e.target.value) || '')}
              label="Time Delay (for better visualization)"
              fullWidth
              margin="normal"
              error={!!timeDelayError}
              helperText={timeDelayError}
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

        <Box marginTop={1}>
          <Button variant="outlined" onClick={navigateBack} margin="normal">
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

export default Page3;