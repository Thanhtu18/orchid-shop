import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';

const useAuthPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for stored authentication data on app load
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch(loginSuccess(userData));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);
};

export default useAuthPersistence;