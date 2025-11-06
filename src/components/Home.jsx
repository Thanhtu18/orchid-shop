import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrchidCard from './OrchidCard';
import { useOrchidsSync, useForceRefresh } from '../hooks/useOrchidsSync';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  selectFilteredOrchids,
  selectOrchidsLoading,
  selectOrchidsError,
  setSearchTerm,
  selectSearchTerm
} from '../store/slices/orchidsSlice';

// Component trang chủ
function Home() {
  const dispatch = useDispatch();
  
  // Redux state
  const orchids = useSelector(selectFilteredOrchids);
  const loading = useSelector(selectOrchidsLoading);
  const error = useSelector(selectOrchidsError);
  const searchTerm = useSelector(selectSearchTerm);

  // Tự động sync với MockAPI (thay thế fetch thủ công)
  useOrchidsSync();
  
  // Hook để force refresh
  const forceRefresh = useForceRefresh();

  // Debug log orchids data
  useEffect(() => {
    console.log('🌺 Home component: Current orchids count:', orchids.length);
    if (orchids.length > 0) {
      console.log('🌺 Orchids loaded from MockAPI:', {
        count: orchids.length,
        firstOrchid: orchids[0]?.name,
        source: 'MockAPI (not Redux cache)',
        apiEndpoint: 'https://69037a6ed0f10a340b247adb.mockapi.io/api/v1/orchids'
      });
    }
  }, [orchids]);

  // Handle search term change
  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  // Show loading state
  if (loading) {
    return (
      <Container maxWidth="xl" style={{ marginTop: '32px', textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Đang tải dữ liệu hoa lan...
        </Typography>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container maxWidth="xl" style={{ marginTop: '32px' }}>
        <Alert severity="error" style={{ marginBottom: '24px' }}>
          Lỗi khi tải dữ liệu: {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={forceRefresh}
        >
          Tải lại từ MockAPI
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" style={{ marginTop: '32px', marginBottom: '32px' }}>
      {/* Tiêu đề trang */}
      <Box style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          style={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px'
          }}
        >
          🌸 Bộ Sưu Tập Hoa Lan
        </Typography>
        <Typography variant="h6" color="textSecondary" style={{ marginBottom: '32px' }}>
          Khám phá thế giới tuyệt đẹp của các loài hoa lan từ khắp nơi trên thế giới
        </Typography>
      </Box>

      {/* Thanh tìm kiếm */}
      <Box style={{ marginBottom: '32px', textAlign: 'center' }}>
        <TextField
          label="Tìm kiếm hoa lan..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '300px', marginRight: '16px' }}
        />
        <Button 
          variant="contained" 
          onClick={handleClearSearch}
          style={{ height: '56px' }}
        >
          Xóa Tìm Kiếm
        </Button>
      </Box>

      {/* Hiển thị số lượng kết quả */}
      <Typography variant="h6" style={{ marginBottom: '24px' }}>
        Hiển thị {orchids.length} hoa lan
      </Typography>

      {/* Lưới hiển thị các thẻ hoa lan - 4 cards một dòng */}
      <Grid container spacing={3} style={{ alignItems: 'stretch' }}>
        {orchids.map((hoaLan) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={hoaLan.id} style={{ display: 'flex' }}>
            <OrchidCard orchid={hoaLan} />
          </Grid>
        ))}
      </Grid>

      {/* Thông báo khi không tìm thấy kết quả */}
      {orchids.length === 0 && (
        <Box style={{ textAlign: 'center', marginTop: '48px' }}>
          <Typography variant="h5" color="textSecondary">
            Không tìm thấy hoa lan nào phù hợp
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ marginTop: '8px' }}>
            Hãy thử từ khóa khác
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Home;