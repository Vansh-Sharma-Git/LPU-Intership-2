// src/utils/auth.js
import axios from 'axios';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.status === 200;
  } catch (error) {
    return false;
  }
};
