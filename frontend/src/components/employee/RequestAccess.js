import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import softwareService from '../../api/software';
import requestService from '../../api/request';
import { useAuth } from '../../context/AuthContext';

const RequestAccess = () => {
  const [softwareId, setSoftwareId] = useState('');
  const [accessType, setAccessType] = useState('');
  const [reason, setReason] = useState('');
  const [softwareList, setSoftwareList] = useState([]);
  const [accessTypes, setAccessTypes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await softwareService.getAllSoftware(user.token);
        setSoftwareList(response.data);
      } catch (error) {
        setError('Failed to fetch software list');
      }
    };
    fetchSoftware();
  }, [user.token]);

  useEffect(() => {
    if (softwareId) {
      const selectedSoftware = softwareList.find(s => s.id === parseInt(softwareId));
      if (selectedSoftware) {
        setAccessTypes(selectedSoftware.accessLevels);
        setAccessType(selectedSoftware.accessLevels[0] || '');
      }
    }
  }, [softwareId, softwareList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await requestService.createRequest(softwareId, accessType, reason, user.token);
      setSuccess(true);
      setSoftwareId('');
      setAccessType('');
      setReason('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating request');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Request Software Access
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" sx={{ mb: 2 }}>
            Request submitted successfully!
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Software</InputLabel>
            <Select
              value={softwareId}
              label="Software"
              onChange={(e) => setSoftwareId(e.target.value)}
              required
            >
              {softwareList.map(software => (
                <MenuItem key={software.id} value={software.id}>
                  {software.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Access Type</InputLabel>
            <Select
              value={accessType}
              label="Access Type"
              onChange={(e) => setAccessType(e.target.value)}
              required
            >
              {accessTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Submit Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RequestAccess;