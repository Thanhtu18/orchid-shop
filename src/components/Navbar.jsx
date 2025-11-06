import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Switch
} from '@mui/material';
import { LocalFlorist, DarkMode, LightMode, AdminPanelSettings } from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import GoogleLoginButton from './GoogleLoginButton';
import MockLoginButton from './MockLoginButton';
import UserProfile from './UserProfile';

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const danhSachTrang = [
    { duongDan: '/', tenTrang: 'Home' },
    { duongDan: '/about', tenTrang: 'About us' },
    { duongDan: '/natural', tenTrang: 'Natural' },
    { duongDan: '/contact', tenTrang: 'Contact' }
  ];

  // Add admin link for authenticated users
  const adminPages = isAuthenticated ? [
    { duongDan: '/admin', tenTrang: 'Admin', icon: <AdminPanelSettings /> }
  ] : [];

  return (
    <AppBar 
      position="static" 
      style={{ 
        background: isDarkMode 
          ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar style={{ padding: '0 24px', minHeight: '80px' }}>
        {/* Logo và tên */}
        <Box style={{ display: 'flex', alignItems: 'center', marginRight: '48px' }}>
          <img 
            src="https://t4.ftcdn.net/jpg/05/09/91/67/240_F_509916726_9jC98aAm2KRE6LxoXfmTrL6KtUVQWLCK.jpg"
            alt="Orchid Logo"
            style={{ 
              width: '48px', 
              height: '48px',
              borderRadius: '50%',
              marginRight: '12px',
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }} 
          />
          <Typography 
            variant="h5" 
            style={{ 
              color: 'white', 
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}
          >
            Orchids Quang Minh🌸
          </Typography>
        </Box>

        {/* Menu chính */}
        <Box style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {danhSachTrang.map((trang) => (
            <Button
              key={trang.duongDan}
              component={Link}
              to={trang.duongDan}
              style={{
                color: 'white',
                margin: '0 8px',
                padding: '12px 24px',
                borderRadius: '25px',
                backgroundColor: location.pathname === trang.duongDan ? '#ff69b4' : 'transparent',
                fontWeight: '500',
                fontSize: '16px',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease',
                boxShadow: location.pathname === trang.duongDan ? '0 4px 15px rgba(255, 105, 180, 0.4)' : 'none'
              }}
              onMouseOver={(e) => {
                if (location.pathname !== trang.duongDan) {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== trang.duongDan) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {trang.tenTrang}
            </Button>
          ))}
          
          {/* Admin menu for authenticated users */}
          {adminPages.map((trang) => (
            <Button
              key={trang.duongDan}
              component={Link}
              to={trang.duongDan}
              startIcon={trang.icon}
              style={{
                color: 'white',
                margin: '0 8px',
                padding: '12px 24px',
                borderRadius: '25px',
                backgroundColor: location.pathname === trang.duongDan ? '#ff69b4' : 'rgba(255,255,255,0.1)',
                fontWeight: '500',
                fontSize: '16px',
                textTransform: 'capitalize',
                transition: 'all 0.3s ease',
                boxShadow: location.pathname === trang.duongDan ? '0 4px 15px rgba(255, 105, 180, 0.4)' : 'none',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {trang.tenTrang}
            </Button>
          ))}
        </Box>

        {/* Authentication Section */}
        <Box style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* User Profile or Login Button */}
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <MockLoginButton />
          )}

          {/* Dark Mode Toggle */}
          <Box 
            onClick={toggleTheme}
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: isDarkMode ? '#2c3e50' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#333333',
              padding: '8px 16px',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              border: '2px solid rgba(255,255,255,0.2)',
              minWidth: '140px',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
          >
            {isDarkMode ? (
              <>
                <DarkMode style={{ fontSize: '20px' }} />
                <Typography 
                  style={{ 
                    fontWeight: '600',
                    fontSize: '14px',
                    userSelect: 'none'
                  }}
                >
                  Dark Mode
                </Typography>
              </>
            ) : (
              <>
                <LightMode style={{ fontSize: '20px', color: '#ff9800' }} />
                <Typography 
                  style={{ 
                    fontWeight: '600',
                    fontSize: '14px',
                    userSelect: 'none'
                  }}
                >
                  Light Mode
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;