import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import softwareService from '../../api/software';
import { useAuth } from '../../context/AuthContext';

const CreateSoftware = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const accessOptions = ['Read', 'Write', 'Admin'];

  const handleCheckboxChange = (level) => {
    setAccessLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await softwareService.createSoftware(name, description, accessLevels, user.token);
      setSuccess(true);
      setName('');
      setDescription('');
      setAccessLevels([]);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating software');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Software
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" sx={{ mb: 2 }}>
            Software created successfully!
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Access Levels
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
            {accessOptions.map(level => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    checked={accessLevels.includes(level)}
                    onChange={() => handleCheckboxChange(level)}
                  />
                }
                label={level}
              />
            ))}
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Create Software
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateSoftware;