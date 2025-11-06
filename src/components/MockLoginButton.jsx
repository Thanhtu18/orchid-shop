import { Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import { AccountCircle, Google } from '@mui/icons-material';

const MockLoginButton = () => {
  const dispatch = useDispatch();

  const handleMockLogin = () => {
    const mockUser = {
      id: '123456789',
      email: 'admin@orchids.com',
      name: 'Orchid Admin',
      picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      given_name: 'Orchid',
      family_name: 'Admin',
      token: 'mock-jwt-token-123'
    };

    // Store in localStorage like real Google login
    localStorage.setItem('authToken', mockUser.token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    // Update Redux state
    dispatch(loginSuccess(mockUser));
    
    console.log('🎉 Mock login successful! Now you can access Admin panel');
  };

  return (
    <Button
      onClick={handleMockLogin}
      variant="contained"
      startIcon={<Google />}
      sx={{
        backgroundColor: '#4285f4',
        color: 'white',
        textTransform: 'none',
        borderRadius: '25px',
        padding: '10px 20px',
        fontWeight: '500',
        fontSize: '14px',
        '&:hover': {
          backgroundColor: '#357ae8',
        }
      }}
    >
      Login (Test Mode)
    </Button>
  );
};

export default MockLoginButton;