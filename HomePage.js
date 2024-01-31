import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';
import TrafficIcon from '@mui/icons-material/Traffic'; // Example icon, replace with your choice
import MazeIcon from '@mui/icons-material/Games'; // Example icon, replace with your choice

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={5}>
        <Typography variant="h3" component="h1" gutterBottom>
          Reinforcement Learning
        </Typography>

        {/* Added "Choose Your Environment" message */}
        <Typography variant="h6" component="h2" gutterBottom>
          Choose Your Environment
        </Typography>

        <Box mt={3} display="flex" justifyContent="space-around" alignItems="center">
          <Button
            variant="outlined"
            startIcon={<TrafficIcon />}
            style={{ borderColor: 'red', color: 'red' }} // Red color for the button
            onClick={() => { /* Intentionally left blank for non-functional button */ }}
          >
            Traffic Environment
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<MazeIcon />}
            onClick={() => navigate('/mazehomepage')}
          >
            Maze Environment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;