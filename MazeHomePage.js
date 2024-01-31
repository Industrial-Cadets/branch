import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function MazeHomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Maze Environment
        </Typography>

        {/* Buttons Container */}
        <Box marginTop={2} display="flex" justifyContent="center">
          {/* Back Button */}
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
            margin="normal"
            style={{ marginRight: '10px' }} // Add some space between buttons
          >
            Back
          </Button>

          {/* Begin Button */}
          <Link to="/page1" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Begin
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default MazeHomePage;