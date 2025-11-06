import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  fetchOrchidById,
  selectSelectedOrchid,
  selectOrchidsLoading,
  selectOrchidsError
} from '../store/slices/orchidsSlice';

// Component trang chi tiết hoa lan
function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  // Redux state
  const hoaLan = useSelector(selectSelectedOrchid);
  const loading = useSelector(selectOrchidsLoading);
  const error = useSelector(selectOrchidsError);

  // Fetch orchid details when component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchOrchidById(id));
    }
  }, [dispatch, id]);

  // Show loading state
  if (loading) {
    return (
      <Container maxWidth="md" style={{ marginTop: '32px', textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Đang tải thông tin hoa lan...
        </Typography>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container maxWidth="md" style={{ marginTop: '32px' }}>
        <Alert severity="error" style={{ marginBottom: '24px' }}>
          Lỗi khi tải dữ liệu: {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => dispatch(fetchOrchidById(id))}
          style={{ marginRight: '16px' }}
        >
          Thử lại
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/"
        >
          ← Về Trang Chủ
        </Button>
      </Container>
    );
  }

  // Nếu không tìm thấy hoa lan
  if (!hoaLan) {
    return (
      <Container maxWidth="md" style={{ marginTop: '32px', textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Không tìm thấy hoa lan này!
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          style={{ marginTop: '16px' }}
        >
          ← Về Trang Chủ
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '32px', marginBottom: '32px' }}>
      {/* Nút quay lại */}
      <Button
        variant="outlined"
        component={Link}
        to="/"
        style={{ marginBottom: '24px' }}
      >
        ← Quay Lại Bộ Sưu Tập
      </Button>

      {/* Khung chứa thông tin chi tiết */}
      <Paper 
        style={{ 
          padding: '32px',
          backgroundColor: 'inherit',
          backgroundImage: 'none'
        }}
      >
        {/* Hình ảnh hoa lan */}
        <img
          src={hoaLan.image}
          alt={hoaLan.name}
          style={{
            width: '100%',
            maxWidth: '500px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'block',
            margin: '0 auto 24px auto'
          }}
        />

        {/* Tên hoa lan */}
        <Typography variant="h3" component="h1" color="primary" style={{ textAlign: 'center', marginBottom: '24px' }}>
          {hoaLan.name}
        </Typography>

        {/* Mô tả */}
        <Typography variant="body1" style={{ marginBottom: '24px', fontSize: '18px', lineHeight: '1.6' }}>
          {hoaLan.description}
        </Typography>

        {/* Thông tin chi tiết */}
        <Box 
          style={{ 
            backgroundColor: 'var(--detail-box-bg, #f5f5f5)', 
            padding: '24px', 
            borderRadius: '8px',
            border: '1px solid var(--detail-box-border, rgba(0,0,0,0.1))'
          }}
        >
          <Typography variant="h6" style={{ marginBottom: '16px' }}>
            Thông Tin Chi Tiết:
          </Typography>

          <Box style={{ marginBottom: '12px' }}>
            <strong>Xuất xứ:</strong> {hoaLan.origin}
          </Box>

          <Box style={{ marginBottom: '12px' }}>
            <strong>Màu sắc:</strong> {hoaLan.color}
          </Box>

          <Box style={{ marginBottom: '12px' }}>
            <strong>Loại hoa lan:</strong> {hoaLan.category}
          </Box>

          <Box style={{ marginBottom: '12px' }}>
            <strong>Đánh giá:</strong> {hoaLan.rating}/5 ⭐⭐⭐⭐⭐
          </Box>

          <Box style={{ marginBottom: '12px' }}>
            <strong>Lượt thích:</strong> {hoaLan.numberOfLike} ❤️
          </Box>

          <Box style={{ marginBottom: '12px' }}>
            <strong>Loại đặc biệt:</strong> {hoaLan.isSpecial ? 'Có ✅' : 'Không ❌'}
          </Box>

          <Box>
            <strong>Loài tự nhiên:</strong> {hoaLan.isNatural ? 'Có ✅' : 'Không ❌'}
          </Box>
        </Box>

        {/* Video nếu có */}
        {hoaLan.videoClip && (
          <Box style={{ marginTop: '24px' }}>
            <Typography variant="h6" style={{ marginBottom: '16px' }}>
              🎥 Video Giới Thiệu:
            </Typography>
            <Box style={{
              position: 'relative',
              paddingBottom: '56.25%', // Tỷ lệ 16:9
              height: 0,
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <iframe
                src={hoaLan.videoClip}
                title={`Video ${hoaLan.name}`}
                frameBorder="0"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Detail;