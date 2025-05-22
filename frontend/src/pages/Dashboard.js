import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, Container } from '@mui/material';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Welcome, {user.username}! You are logged in as {user.role}.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;