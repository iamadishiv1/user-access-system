import React from 'react';
import { Typography, Box, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ 
        mt: 4, 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography variant="h3">Welcome to User Access System</Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Please login or sign up to access the system
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
            sx={{ px: 4, py: 1.5 }}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/signup')}
            sx={{ px: 4, py: 1.5 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;