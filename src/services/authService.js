import api, { endpoints } from './api';

class AuthService {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post(endpoints.auth.login, credentials);
      
      if (response.success && response.data) {
        const { user, token, expiresIn } = response.data;
        
        // Store authentication data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('tokenExpiry', new Date(Date.now() + this.parseExpiryTime(expiresIn)).toISOString());
        
        return { success: true, user, token };
      }
      
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed',
        error: error.error
      };
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await api.post(endpoints.auth.register, userData);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Store authentication data
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { success: true, user, token };
      }
      
      return { success: false, message: response.message || 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.message || 'Registration failed',
        error: error.error
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await api.post(endpoints.auth.logout);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
    }
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await api.get(endpoints.auth.profile);
      
      if (response.success && response.data) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
      }
      
      return { success: false, message: response.message || 'Failed to get profile' };
    } catch (error) {
      console.error('Get profile error:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to get profile' 
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put(endpoints.auth.profile, profileData);
      
      if (response.success && response.data) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
      }
      
      return { success: false, message: response.message || 'Failed to update profile' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to update profile' 
      };
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.post(endpoints.auth.changePassword, passwordData);
      
      return { 
        success: response.success, 
        message: response.message || (response.success ? 'Password changed successfully' : 'Failed to change password')
      };
    } catch (error) {
      console.error('Change password error:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to change password' 
      };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await api.post(endpoints.auth.forgotPassword, { email });
      
      return { 
        success: response.success, 
        message: response.message || (response.success ? 'Password reset link sent' : 'Failed to send reset link')
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to send reset link' 
      };
    }
  }

  // Reset password
  async resetPassword(token, passwordData) {
    try {
      const response = await api.post(endpoints.auth.resetPassword(token), passwordData);
      
      if (response.success && response.data) {
        const { token: authToken } = response.data;
        localStorage.setItem('authToken', authToken);
        
        return { success: true, token: authToken };
      }
      
      return { success: false, message: response.message || 'Failed to reset password' };
    } catch (error) {
      console.error('Reset password error:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to reset password' 
      };
    }
  }

  // Verify token
  async verifyToken() {
    try {
      const response = await api.get(endpoints.auth.verify);
      
      if (response.success && response.data) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Verify token error:', error);
      return { success: false };
    }
  }

  // Create master user (one-time setup)
  async createMasterUser() {
    try {
      const response = await api.post(endpoints.auth.createMaster);
      
      return { 
        success: response.success, 
        message: response.message || (response.success ? 'Master user created successfully' : 'Failed to create master user')
      };
    } catch (error) {
      console.error('Create master user error:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to create master user' 
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !expiry) {
      return false;
    }
    
    return new Date() < new Date(expiry);
  }

  // Get current user from localStorage
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Check if user has specific role
  hasRole(role) {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Check if user has any of the specified roles
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return roles.includes(user?.role);
  }

  // Check if user is admin or higher
  isAdminOrHigher() {
    return this.hasAnyRole(['master', 'admin']);
  }

  // Check if user is staff or higher
  isStaffOrHigher() {
    return this.hasAnyRole(['master', 'admin', 'doctor', 'technician', 'receptionist']);
  }

  // Parse expiry time string to milliseconds
  parseExpiryTime(expiryStr) {
    const match = expiryStr.match(/(\d+)([dhms])/);
    if (!match) return 24 * 60 * 60 * 1000; // Default 24 hours
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'd': return value * 24 * 60 * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'm': return value * 60 * 1000;
      case 's': return value * 1000;
      default: return 24 * 60 * 60 * 1000;
    }
  }
}

export default new AuthService();
