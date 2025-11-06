import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  const handleSuccess = (credentialResponse) => {
    try {
      dispatch(loginStart());
      
      // Decode the JWT token to get user information
      const decoded = jwtDecode(credentialResponse.credential);
      
      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        token: credentialResponse.credential
      };

      // Store user data in localStorage
      localStorage.setItem('authToken', credentialResponse.credential);
      localStorage.setItem('user', JSON.stringify(userData));

      dispatch(loginSuccess(userData));
      
      console.log('Login successful:', userData);
    } catch (error) {
      console.error('Error decoding token:', error);
      dispatch(loginFailure('Failed to process login'));
    }
  };

  const handleError = (error) => {
    console.error('Login failed:', error);
    dispatch(loginFailure('Google login failed'));
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      theme="outline"
      size="large"
      text="signin_with"
      shape="rectangular"
    />
  );
};

export default GoogleLoginButton;