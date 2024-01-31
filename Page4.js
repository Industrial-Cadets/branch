import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';

function Page4() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Start the Simulation
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          You have completed all the necessary inputs.
        </Typography>

        <Box marginTop={2}>
        <Button variant="outlined" onClick={() => navigate('/page3')} margin="normal">
          Back
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => navigate('/page5')}
          style={{ marginLeft: '10px' }}
        >
          Start Simulation
        </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Page4;