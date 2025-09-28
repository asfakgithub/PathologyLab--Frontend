<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
=======
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './Component/common/ProtectedRoute';
import Login from './Component/Auth/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import DashboardHome from './Component/Dashboard/DashboardHome';
import PatientsManagement from './Component/Dashboard/PatientsManagement';
import InvoiceManagement from './Component/Dashboard/InvoiceManagement';
import LoadingSpinner from './Component/common/LoadingSpinner';
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
import './App.css';
import Navbar from './Component/Navbar';
import HomeScreen from './Component/Pages/HomeScreen/homeScreen';
import Status from './Component/Pages/StatusPage/status';
import Report from './Component/Pages/ReportPage/report';
import Prescription from './Component/Pages/Prescription/prescription';
// import axios from "axios"

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path='/status' element={<Status />} />
          <Route path='/report/:id' element={<Report />} />
          <Route path="/prescription/:id" element={<Prescription />} />
        </Routes>
    </div>
=======
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Box sx={{ minHeight: '100vh' }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
                {/* Nested Dashboard Routes */}
                <Route index element={<DashboardHome />} />
                <Route 
                  path="patients" 
                  element={
                    <ProtectedRoute allowedRoles={['master', 'admin', 'doctor', 'technician', 'receptionist']}>
                      <PatientsManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="invoices" 
                  element={
                    <ProtectedRoute allowedRoles={['master', 'admin', 'receptionist']}>
                      <InvoiceManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="tests" 
                  element={
                    <ProtectedRoute allowedRoles={['master', 'admin', 'doctor', 'technician']}>
                      <div style={{ padding: '20px' }}>
                        <h2>Tests Management</h2>
                        <p>Test management component coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="analytics" 
                  element={
                    <ProtectedRoute allowedRoles={['master', 'admin']}>
                      <div style={{ padding: '20px' }}>
                        <h2>Analytics Dashboard</h2>
                        <p>Analytics dashboard coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="settings" 
                  element={
                    <ProtectedRoute allowedRoles={['master', 'admin']}>
                      <div style={{ padding: '20px' }}>
                        <h2>Settings</h2>
                        <p>Settings panel coming soon...</p>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="profile" 
                  element={
                    <div style={{ padding: '20px' }}>
                      <h2>User Profile</h2>
                      <p>Profile management coming soon...</p>
                    </div>
                  } 
                />
              </Route>

            {/* Default Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Box>
      </AuthProvider>
    </ThemeProvider>
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
  );
}

export default App;
