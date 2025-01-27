import axios from 'axios';

// Create an Axios instance with the token in the header
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Update with your backend URL
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Get token from localStorage
  }
});

export default axiosInstance;
