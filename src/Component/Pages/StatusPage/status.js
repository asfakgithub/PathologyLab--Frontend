<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./status.css"
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import Modal from "../../Modal/model"
// import report from '../ReportPage/report';

const Status = () => {
  const [activeBar, setActiveBar] = useState("Pending")
  const [allPatients, setAllPatients] = useState([])
  const [data, setData] = useState([])
  const [clickUpdate, setClickUpdate] = useState(false)
  const [clickedPatient, setClickedPatient] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/patient/getAllPatients")
      .then(res => res.json())
      .then(res => {
        if (res && res.data) {
          setAllPatients(res.data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (activeBar === "Pending") {
      setData(allPatients.filter(p => p.status === "Pending"));
    } else {
      setData(allPatients.filter(p => p.status === "Completed"));
    }
  }, [activeBar, allPatients]);

  const updateIconClick = (item) => {
    // Navigate to report page for update (fetches patient by id)
    navigate(`/report/${item._id}`);
  }

  return (
    <div className='statusPage'>
      <div className='statusPageWorkDiv'>
        <div className='statusBar'>
          <div className={`statusTitle ${activeBar === "Pending" ? "activeBarStatus" : null}`}
            onClick={() => { setActiveBar("Pending") }}
          >
            Pending
          </div>
          <div className={`statusTitle ${activeBar === "Completed" ? "activeBarStatus" : null}`}
            onClick={() => { setActiveBar("Completed") }}
          >
            Complete
          </div>
        </div> 
        {/* SEARCH BAR */}
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1.5em 0 1em 0' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '0.6em 1em',
              borderRadius: '0.5em',
              border: '1.5px solid #0cbbbb',
              fontSize: '1em',
              outline: 'none',
              minWidth: '220px',
              background: '#f8fefe',
              color: '#222',
              boxShadow: '0 1px 4px #b2dfdf33',
              transition: 'border 0.2s, box-shadow 0.2s',
            }}
          />
        </div> */}

        <div className='statusList'>
          {
            data && data.map((item, index) => {
              return (
                <div className='statusRowList' key={item._id}>
                  <div className='statusName'>
                    {item.name}
                  </div>
                  <div className='statusDrDetails'>
                    <div className='statusDrName'>{item.examinedBy}</div>
                    <div className='statusDrName'>{item.reportdate}</div>
                  </div>
                  <div className='statusBtns'>
                    {
                      activeBar === "Pending" ? <div className="icons" style={{ backgroundColor: "yellowgreen" }} onClick={() => { updateIconClick(item) }}><UpdateIcon /></div> : null
                    }
                    {
                      activeBar === "Pending" ? <div className="icons" style={{ backgroundColor: "red" }}><DeleteIcon /></div> : null
                    }
                    <Link to={`/report/${item._id}`} className='icons'>
                      <DescriptionIcon />
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
  {/* Removed unused Modal logic */}
    </div>
  )
}

export default Status
=======
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Pagination
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import './status.css';
import Modal from '../../Modal/model';
import { apiService, handleApiError } from '../../../utils/apiClient';
import { useNotification } from '../../../contexts/NotificationContext';
import noDataImage from '../../../assests/nodatafound.jpg';

const Status = () => {
  // State management
  const [activeBar, setActiveBar] = useState('Pending');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [clickedPatient, setClickedPatient] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, patient: null });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10
  });
  
  // Hooks
  const { showSuccess, showError, showWarning } = useNotification();

  // Fetch patients with error handling and loading states
  const fetchPatients = useCallback(async (page = 1, showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);

    try {
      const response = await apiService.patients.getByStatus(activeBar, {
        page,
        limit: pagination.limit,
        sort: '-createdAt'
      });

      const { patients, pagination: paginationData } = response.data.data;
      
      setData(patients);
      setPagination(paginationData);
      
      // Show success message for refresh
      if (!showLoader) {
        showSuccess(`Refreshed ${activeBar.toLowerCase()} patients`);
      }
      
    } catch (err) {
      const handledError = handleApiError(err);
      setError(handledError);
      showError(handledError.userMessage);
      console.error('Error fetching patients:', handledError);
    } finally {
      setLoading(false);
    }
  }, [activeBar, pagination.limit, showSuccess, showError]);

  // Effect to fetch data when activeBar changes
  useEffect(() => {
    fetchPatients(1, true);
  }, [activeBar]); // fetchPatients excluded from deps to prevent infinite loop

  // Handle status tab change
  const handleStatusChange = (status) => {
    if (status !== activeBar) {
      setActiveBar(status);
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    }
  };

  // Handle pagination
  const handlePageChange = (event, page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    fetchPatients(page, false);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchPatients(pagination.currentPage, false);
  };

  // Update patient handlers
  const handleUpdateClick = (patient) => {
    setClickUpdate(true);
    setClickedPatient(patient);
  };

  const handleUpdateClose = () => {
    setClickUpdate(false);
    setClickedPatient(null);
    // Refresh data after potential update
    fetchPatients(pagination.currentPage, false);
  };

  // Delete patient handlers
  const handleDeleteClick = (patient) => {
    setDeleteDialog({ open: true, patient });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.patient) return;

    try {
      setLoading(true);
      await apiService.patients.delete(deleteDialog.patient._id);
      
      showSuccess(`Patient ${deleteDialog.patient.name} deleted successfully`);
      setDeleteDialog({ open: false, patient: null });
      
      // Refresh the current page or go back if it becomes empty
      const newTotalCount = pagination.totalCount - 1;
      const newTotalPages = Math.ceil(newTotalCount / pagination.limit);
      const targetPage = pagination.currentPage > newTotalPages ? 
        Math.max(1, newTotalPages) : pagination.currentPage;
      
      fetchPatients(targetPage, false);
      
    } catch (err) {
      const handledError = handleApiError(err);
      showError(handledError.userMessage);
      console.error('Error deleting patient:', handledError);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, patient: null });
  };

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  // Render error state
  if (error && !loading) {
    return (
      <Box className="statusPage" display="flex" flexDirection="column" alignItems="center" p={4}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h5" color="error" gutterBottom>
          Failed to Load Patients
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
          {error.userMessage}
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => fetchPatients(pagination.currentPage, true)}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <div className="statusPage">
      <Box className="statusPageWorkDiv" maxWidth="lg" mx="auto" p={2}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Patient Status
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>

        {/* Status Tabs */}
        <Box className="statusBar" mb={4}>
          {['Pending', 'Completed'].map((status) => (
            <Button
              key={status}
              variant={activeBar === status ? 'contained' : 'outlined'}
              onClick={() => handleStatusChange(status)}
              sx={{ mr: 1 }}
              disabled={loading}
            >
              {status}
            </Button>
          ))}
        </Box>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <Box textAlign="center" py={8}>
            <img
              src={noDataImage}
              alt="No data found"
              style={{ maxWidth: 200, marginBottom: 16, opacity: 0.6 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No {activeBar.toLowerCase()} patients found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activeBar === 'Pending' ? 
                'No patients are currently pending review.' : 
                'No completed patient records found.'}
            </Typography>
          </Box>
        )}

        {/* Patient List */}
        {!loading && data.length > 0 && (
          <>
            <Grid container spacing={2}>
              {data.map((patient) => (
                <Grid item xs={12} key={patient._id}>
                  <Card elevation={2}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box flex={1}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            {patient.name}
                          </Typography>
                          <Box display="flex" gap={2} mb={1}>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Dr:</strong> {patient.examinedBy}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Date:</strong> {patient.reportDate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Mobile:</strong> {patient.mobileNo}
                            </Typography>
                          </Box>
                          <Chip
                            label={patient.status}
                            color={getStatusColor(patient.status)}
                            size="small"
                          />
                        </Box>
                        
                        <Box display="flex" gap={1}>
                          <Tooltip title="Update Patient">
                            <IconButton
                              color="primary"
                              onClick={() => handleUpdateClick(patient)}
                            >
                              <UpdateIcon />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="View Report">
                            <IconButton
                              component={Link}
                              to={`/report/${patient._id}`}
                              color="info"
                            >
                              <DescriptionIcon />
                            </IconButton>
                          </Tooltip>
                          
                          <Tooltip title="Delete Patient">
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteClick(patient)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}

            {/* Results Info */}
            <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
              Showing {data.length} of {pagination.totalCount} {activeBar.toLowerCase()} patients
            </Typography>
          </>
        )}

        {/* Update Modal */}
        {clickUpdate && (
          <Modal
            clickUpdate={clickUpdate}
            setClickUpdate={setClickUpdate}
            clickedPatient={clickedPatient}
            onClose={handleUpdateClose}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={handleDeleteCancel}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              This action cannot be undone.
            </Alert>
            <Typography>
              Are you sure you want to delete patient{' '}
              <strong>{deleteDialog.patient?.name}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              disabled={loading}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Status;
>>>>>>> 392d542084933c5a1b9c85a4653943df4ba14587
