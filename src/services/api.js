import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Token expired or invalid
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      // Return structured error
      return Promise.reject({
        message: data?.message || 'An error occurred',
        error: data?.error || 'UNKNOWN_ERROR',
        status: status,
        details: data
      });
    } else if (error.request) {
      // Network error
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        error: 'NETWORK_ERROR',
        status: 0
      });
    } else {
      // Other error
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        error: 'UNKNOWN_ERROR',
        status: 0
      });
    }
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/profile',
    refreshToken: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: (token) => `/auth/reset-password/${token}`,
    changePassword: '/auth/change-password',
    verify: '/auth/verify',
    createMaster: '/auth/setup/master'
  },
  
  // Patients
  patients: {
    list: '/patient',
    create: '/patient',
    getById: (id) => `/patient/${id}`,
    update: (id) => `/patient/${id}`,
    delete: (id) => `/patient/${id}`,
    search: '/patient/search'
  },
  
  // Tests
  tests: {
    list: '/test',
    create: '/test',
    getById: (id) => `/test/${id}`,
    update: (id) => `/test/${id}`,
    delete: (id) => `/test/${id}`,
    search: '/test/search'
  },
  
  // Invoices
  invoices: {
    list: '/invoices',
    create: '/invoices',
    getById: (id) => `/invoices/${id}`,
    update: (id) => `/invoices/${id}`,
    addPayment: (id) => `/invoices/${id}/payments`,
    cancel: (id) => `/invoices/${id}/cancel`,
    stats: '/invoices/stats'
  },
  
  // Settings
  settings: {
    get: '/settings',
    update: '/settings',
    uploadHeader: '/settings/images/header',
    uploadFooter: '/settings/images/footer',
    uploadLogo: '/settings/images/logo',
    getImage: (type) => `/settings/images/${type}`,
    getImageBase64: (type) => `/settings/images/${type}/base64`,
    deleteImage: (type) => `/settings/images/${type}`,
    systemInfo: '/settings/system'
  }
};

// Auth endpoints
export const login = (credentials) => api.post(endpoints.auth.login, credentials);
export const register = (userData) => api.post(endpoints.auth.register, userData);
export const refreshToken = () => api.post(endpoints.auth.refresh);
export const logout = () => api.post(endpoints.auth.logout);
export const getProfile = () => api.get(endpoints.auth.profile);
export const updateProfile = (data) => api.put(endpoints.auth.profile, data);

// Dashboard endpoints
export const getDashboardStats = () => api.get(endpoints.dashboard.stats);

// Patient endpoints
export const getPatients = (params) => api.get(endpoints.patients.list, { params });
export const getPatient = (id) => api.get(endpoints.patients.getById(id));
export const createPatient = (data) => api.post(endpoints.patients.create, data);
export const updatePatient = (id, data) => api.put(endpoints.patients.update(id), data);
export const deletePatient = (id) => api.delete(endpoints.patients.delete(id));

// Test endpoints
export const getTests = (params) => api.get(endpoints.tests.list, { params });
export const getTest = (id) => api.get(endpoints.tests.getById(id));
export const createTest = (data) => api.post(endpoints.tests.create, data);
export const updateTest = (id, data) => api.put(endpoints.tests.update(id), data);
export const deleteTest = (id) => api.delete(endpoints.tests.delete(id));

// Invoice endpoints
export const getInvoices = (params) => api.get(endpoints.invoices.list, { params });
export const getInvoice = (id) => api.get(endpoints.invoices.getById(id));
export const createInvoice = (data) => api.post(endpoints.invoices.create, data);
export const updateInvoice = (id, data) => api.put(endpoints.invoices.update(id), data);
export const deleteInvoice = (id) => api.delete(endpoints.invoices.delete(id));
export const processPayment = (id, data) => api.post(endpoints.invoices.addPayment(id), data);

// Settings endpoints
export const getSettings = () => api.get(endpoints.settings.get);
export const updateSettings = (data) => api.put(endpoints.settings.update, data);
export const uploadHeaderImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post(endpoints.settings.uploadHeader, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const uploadFooterImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post(endpoints.settings.uploadFooter, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export default api;
