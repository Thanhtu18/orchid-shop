import { Container, Typography, Box, Paper, Divider } from '@mui/material';

// Component trang giới thiệu
function About() {
  return (
    <Container maxWidth="md" style={{ marginTop: '32px', marginBottom: '32px' }}>
      <Paper elevation={3} style={{ padding: '48px', backgroundColor: '#f8f9fa' }}>
        {/* Tiêu đề trang */}
        <Box style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Typography variant="h3" component="h1" color="primary" style={{ fontWeight: 'bold' }}>
            🌸 Giới Thiệu Về Chúng Tôi
          </Typography>
        </Box>

        <Divider style={{ margin: '32px 0' }} />

        {/* Nội dung giới thiệu */}
        <Typography variant="h5" color="primary" style={{ marginBottom: '16px', fontWeight: '500' }}>
          Chào mừng bạn đến với thế giới hoa lan!
        </Typography>

        <Typography variant="body1" style={{ lineHeight: 1.8, marginBottom: '24px', fontSize: '18px' }}>
          Chúng tôi là những người đam mê hoa lan, dành cả cuộc đời để nghiên cứu và bảo tồn 
          những loài hoa tuyệt đẹp này. Website này được tạo ra với mục đích chia sẻ kiến thức 
          và tình yêu với hoa lan đến mọi người.
        </Typography>

        <Typography variant="h6" color="secondary" style={{ marginBottom: '16px', fontWeight: '500' }}>
          🎯 Sứ mệnh của chúng tôi:
        </Typography>

        <Box component="ul" style={{ marginLeft: '24px', marginBottom: '24px' }}>
          <Typography component="li" variant="body1" style={{ marginBottom: '8px', fontSize: '17px' }}>
            Giới thiệu và bảo tồn các loài hoa lan quý hiếm
          </Typography>
          <Typography component="li" variant="body1" style={{ marginBottom: '8px', fontSize: '17px' }}>
            Chia sẻ kiến thức chăm sóc hoa lan cho người mới bắt đầu
          </Typography>
          <Typography component="li" variant="body1" style={{ marginBottom: '8px', fontSize: '17px' }}>
            Tạo cộng đồng yêu thích hoa lan tại Việt Nam
          </Typography>
          <Typography component="li" variant="body1" style={{ marginBottom: '8px', fontSize: '17px' }}>
            Khuyến khích việc trồng hoa lan bền vững và thân thiện với môi trường
          </Typography>
        </Box>

        <Typography variant="h6" color="secondary" style={{ marginBottom: '16px', fontWeight: '500' }}>
          🌺 Tại sao chọn hoa lan?
        </Typography>

        <Typography variant="body1" style={{ lineHeight: 1.8, marginBottom: '24px', fontSize: '18px' }}>
          Hoa lan không chỉ đẹp mà còn có ý nghĩa sâu sắc trong văn hóa Việt Nam. 
          Chúng tượng trưng cho sự thanh cao, tinh tế và bền bỉ. Mỗi loài hoa lan 
          có một câu chuyện riêng, một vẻ đẹp độc đáo mà thiên nhiên đã ban tặng.
        </Typography>

        <Divider style={{ margin: '32px 0' }} />

        <Box style={{ textAlign: 'center' }}>
          <Typography variant="h6" color="primary" style={{ fontStyle: 'italic' }}>
            "Hãy để hoa lan mang đến niềm vui và bình an cho cuộc sống của bạn"
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default About;