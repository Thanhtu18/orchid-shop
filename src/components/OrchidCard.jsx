import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions
} from '@mui/material';

// Component thẻ hiển thị hoa lan
function OrchidCard({ orchid }) {
  return (
    <Card 
      style={{ 
        width: '100%',
        height: '420px', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      }}
    >
      {/* Hình ảnh hoa lan */}
      <Box style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={orchid.image}
          alt={orchid.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
      </Box>
      
      {/* Nội dung thẻ */}
      <CardContent 
        style={{ 
          flexGrow: 1, 
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '160px'
        }}
      >
        <Box>
          {/* Tên hoa lan */}
          <Typography 
            variant="h6" 
            component="div" 
            style={{ 
              marginBottom: '12px',
              fontWeight: 'bold',
              color: '#333',
              fontSize: '16px',
              lineHeight: '1.2',
              minHeight: '20px'
            }}
          >
            {orchid.name}
          </Typography>
          
          {/* Thông tin chi tiết */}
          <Box style={{ marginBottom: '12px' }}>
            <Typography 
              variant="body2" 
              style={{ 
                color: '#666',
                marginBottom: '4px',
                fontSize: '13px'
              }}
            >
              <strong>Origin:</strong> {orchid.origin}
            </Typography>
            
            <Typography 
              variant="body2" 
              style={{ 
                color: '#666',
                marginBottom: '4px',
                fontSize: '13px'
              }}
            >
              <strong>Color:</strong> {orchid.color}
            </Typography>

            <Typography 
              variant="body2" 
              style={{ 
                color: '#666',
                marginBottom: '4px',
                fontSize: '13px'
              }}
            >
              <strong>Category:</strong> {orchid.category}
            </Typography>
          </Box>
        </Box>

        {/* Badges - luôn ở cuối */}
        <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {orchid.isSpecial && (
            <Box style={{
              backgroundColor: '#ff69b4',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Special
            </Box>
          )}
          {orchid.isNatural && (
            <Box style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Natural
            </Box>
          )}
        </Box>
      </CardContent>

      <CardActions 
        style={{ 
          padding: '12px 16px', 
          backgroundColor: 'rgba(0,0,0,0.02)'
        }}
      >
        <Button
          component={Link}
          to={`/detail/${orchid.id}`}
          variant="contained"
          size="small"
          fullWidth
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '6px',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: '500',
            padding: '6px 16px',
            boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#45a049';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.4)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#4CAF50';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Xem Chi Tiết
        </Button>
      </CardActions>
    </Card>
  );
}

export default OrchidCard;