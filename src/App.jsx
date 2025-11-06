// Component chính của ứng dụng - Đã tích hợp Redux và Google OAuth
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as CustomThemeProvider } from './hooks/useTheme';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store';
import Detail from './components/Detail';
import Home from './components/Home';
import About from './components/About';
import Natural from './components/Natural';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import useAuthPersistence from './hooks/useAuthPersistence';
import './App.css';

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientId || "your-google-client-id.apps.googleusercontent.com"}>
        <CustomThemeProvider>
          <AppContent />
        </CustomThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

function AppContent() {
  // Initialize authentication persistence
  useAuthPersistence();

  // Tạo theme đơn giản cho Material-UI
  const theme = createTheme({
    palette: {
      primary: {
        main: '#667eea', // Màu tím chính
      },
      secondary: {
        main: '#ff69b4', // Màu hồng phụ
      },
    },
    typography: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline giúp reset CSS mặc định */}
      <CssBaseline />
      
      {/* Router để điều hướng giữa các trang */}
      <Router>
        {/* Thanh điều hướng */}
        <Navbar />
        
        {/* Các trang của ứng dụng */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/natural" element={<Natural />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;