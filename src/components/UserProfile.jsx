import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Menu, MenuItem, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { logout, selectUser } from '../store/slices/authSlice';
import { googleLogout } from '@react-oauth/google';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      // Google logout
      googleLogout();
      
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Redux logout
      dispatch(logout());
      
      handleClose();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Button
        onClick={handleClick}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: 'white',
          textTransform: 'none'
        }}
      >
        <Avatar 
          src={user.picture} 
          alt={user.name}
          sx={{ width: 32, height: 32 }}
        />
        <Typography variant="body2">
          {user.given_name || user.name}
        </Typography>
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
      >
        <MenuItem onClick={handleClose} disabled>
          <Box>
            <Typography variant="subtitle2">{user.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Đăng xuất
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;