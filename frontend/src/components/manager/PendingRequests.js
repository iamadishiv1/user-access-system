import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup } from '@mui/material';
import requestService from '../../api/request';
import { useAuth } from '../../context/AuthContext';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await requestService.getPendingRequests(user.token);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch pending requests');
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user.token]);

  const handleStatusChange = async (requestId, status) => {
    try {
      await requestService.updateRequestStatus(requestId, status, user.token);
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status } : req
      ));
    } catch (error) {
      setError('Failed to update request status');
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Pending Access Requests
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Software</TableCell>
                <TableCell>Access Type</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.user.username}</TableCell>
                  <TableCell>{request.software.name}</TableCell>
                  <TableCell>{request.accessType}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button 
                        color="success" 
                        onClick={() => handleStatusChange(request.id, 'Approved')}
                      >
                        Approve
                      </Button>
                      <Button 
                        color="error" 
                        onClick={() => handleStatusChange(request.id, 'Rejected')}
                      >
                        Reject
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default PendingRequests;