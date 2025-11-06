import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrchids, selectAllOrchids } from '../store/slices/orchidsSlice';
import OrchidCard from './OrchidCard';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button
} from '@mui/material';

// Component trang hoa lan đặc biệt
function Natural() {
  const dispatch = useDispatch();
  const orchids = useSelector(selectAllOrchids);
  
  // State để lưu từ khóa tìm kiếm
  const [timKiem, setTimKiem] = useState('');

  // Fetch orchids data when component mounts
  useEffect(() => {
    dispatch(fetchOrchids());
  }, [dispatch]);

  // Lọc các hoa lan đặc biệt (isSpecial = true) theo từ khóa tìm kiếm
  const hoaLanDacBiet = orchids.filter(hoaLan => {
    return hoaLan.isSpecial && hoaLan.name.toLowerCase().includes(timKiem.toLowerCase());
  });

  return (
    <Container maxWidth="xl" style={{ marginTop: '32px', marginBottom: '32px' }}>
      {/* Tiêu đề trang */}
      <Box style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Typography variant="h2" component="h1" color="primary" style={{ fontWeight: 'bold' }}>
          🌿 Hoa Lan Đặc Biệt
        </Typography>
        <Typography variant="h6" color="textSecondary" style={{ marginBottom: '32px' }}>
          Khám phá những loài hoa lan quý hiếm và đặc biệt nhất
        </Typography>
      </Box>

      {/* Thanh tìm kiếm */}
      <Box style={{ marginBottom: '32px', textAlign: 'center' }}>
        <TextField
          label="Tìm kiếm hoa lan đặc biệt..."
          variant="outlined"
          value={timKiem}
          onChange={(e) => setTimKiem(e.target.value)}
          style={{ width: '300px', marginRight: '16px' }}
        />
        <Button 
          variant="contained" 
          onClick={() => setTimKiem('')}
          style={{ height: '56px' }}
        >
          Xóa Tìm Kiếm
        </Button>
      </Box>

      {/* Hiển thị số lượng kết quả */}
      <Typography variant="h6" style={{ marginBottom: '24px' }}>
        Hiển thị {hoaLanDacBiet.length} hoa lan đặc biệt
      </Typography>

      {/* Lưới hiển thị các thẻ hoa lan đặc biệt - 4 cards một dòng */}
      <Grid container spacing={3} style={{ alignItems: 'stretch' }}>
        {hoaLanDacBiet.map((hoaLan) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={hoaLan.id} style={{ display: 'flex' }}>
            <OrchidCard orchid={hoaLan} />
          </Grid>
        ))}
      </Grid>

      {/* Thông báo khi không tìm thấy kết quả */}
      {hoaLanDacBiet.length === 0 && (
        <Box style={{ textAlign: 'center', marginTop: '48px' }}>
          <Typography variant="h5" color="textSecondary">
            Không tìm thấy hoa lan đặc biệt nào phù hợp
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ marginTop: '8px' }}>
            Hãy thử từ khóa khác hoặc xóa bộ lọc tìm kiếm
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Natural;