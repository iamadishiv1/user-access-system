import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CreateSoftware from './components/admin/CreateSoftware';
import RequestAccess from './components/employee/RequestAccess';
import MyRequests from './components/employee/MyRequests';
import PendingRequests from './components/manager/PendingRequests';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-software"
            element={
              <PrivateRoute roles={['Admin']}>
                <CreateSoftware />
              </PrivateRoute>
            }
          />
          <Route
            path="/request-access"
            element={
              <PrivateRoute roles={['Employee']}>
                <RequestAccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-requests"
            element={
              <PrivateRoute roles={['Employee']}>
                <MyRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="/pending-requests"
            element={
              <PrivateRoute roles={['Manager']}>
                <PendingRequests />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;