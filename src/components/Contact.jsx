import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Alert,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  ExpandMore as ExpandMoreIcon,
  Support as ContactIcon
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`contact-tabpanel-${index}`}
      aria-labelledby={`contact-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
//a
function Contact() {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
    
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: "Gửi Email",
      content: "tudtse184093@fpt.edu.vn, dangthanhtu110104@gmail.com",
      description: "Chúng tôi phản hồi trong vòng 24 giờ"
    },
    {
      icon: <PhoneIcon />,
      title: "Gọi Điện",
      content: "0799747272",
      description: "Thứ 2-6, 9AM-6PM (GMT+7)"
    },
    {
      icon: <LocationIcon />,
      title: "Ghé Thăm",
      content: "Biên Hòa - Đồng Nai",
      description: "Nhà kính của chúng tôi mở cửa đón khách tham quan"
    }
  ];

  const faqData = [
    {
      question: "Bạn có bán cây hoa lan không?",
      answer: "Có! Chúng tôi cung cấp nhiều loại hoa lan và giống lai đa dạng. Hãy liên hệ để biết tình trạng có hàng và giá cả. Chúng tôi giao hàng toàn quốc với đóng gói chuyên nghiệp đảm bảo sức khỏe cây."
    },
    {
      question: "Tôi có thể đến thăm bộ sưu tập hoa lan của bạn không?",
      answer: "Tất nhiên rồi! Nhà kính của chúng tôi mở cửa đón khách tham quan theo lịch hẹn. Vui lòng liên hệ trước ít nhất 48 giờ để đặt lịch thăm quan."
    },
    {
      question: "Bạn có cung cấp dịch vụ tư vấn chăm sóc hoa lan không?",
      answer: "Có, chúng tôi cung cấp cả tư vấn trực tiếp và trực tuyến về chăm sóc hoa lan. Các chuyên gia của chúng tôi có thể giúp bạn giải quyết vấn đề và tối ưu hóa điều kiện trồng trọt."
    },
    {
      question: "Làm thế nào tôi có thể đóng góp thông tin hoa lan vào cơ sở dữ liệu của bạn?",
      answer: "Chúng tôi hoan nghênh những đóng góp từ các người đam mê hoa lan! Vui lòng gửi email cho chúng tôi với thông tin chi tiết và ảnh chất lượng cao về hoa lan của bạn."
    },
    {
      question: "Bạn có tổ chức các sự kiện hoặc workshop về hoa lan không?",
      answer: "Có! Chúng tôi thường xuyên tổ chức các workshop về chăm sóc hoa lan, thay chậu và nhân giống. Theo dõi mạng xã hội của chúng tôi để cập nhật thông báo về các sự kiện sắp tới."
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary" fontWeight="bold">
          <ContactIcon sx={{ fontSize: 'inherit', mr: 2 }} />
          Liên Hệ Với Chúng Tôi
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Liên hệ với các chuyên gia hoa lan của chúng tôi. Chúng tôi sẵn sàng giúp đỡ mọi thắc mắc về hoa lan của bạn!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
            Thông Tin Liên Hệ
          </Typography>
          
          {contactInfo.map((info, index) => (
            <Card key={index} sx={{ mb: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton sx={{ color: 'primary.main', mr: 2 }}>
                    {info.icon}
                  </IconButton>
                  <Typography variant="h6">
                    {info.title}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                  {info.content}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {info.description}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {/* Social Media */}
          <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Theo Dõi Chúng Tôi
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary" sx={{ bgcolor: 'primary.50' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" sx={{ bgcolor: 'primary.50' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" sx={{ bgcolor: 'primary.50' }}>
                <InstagramIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Cập nhật tin tức mới nhất về hoa lan, mẹo chăm sóc và những bổ sung mới cho bộ sưu tập của chúng tôi!
            </Typography>
          </Paper>
        </Grid>

        {/* Contact Form and FAQ */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Gửi Tin Nhắn" />
              <Tab label="Câu Hỏi Thường Gặp" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              {submitStatus === 'success' && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Họ và Tên"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      type="email"
                      label="Địa Chỉ Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Tiêu Đề"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Loại Yêu Cầu:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {[
                          { value: 'general', label: 'Câu Hỏi Chung' },
                          { value: 'care', label: 'Chăm Sóc Cây' },
                          { value: 'purchase', label: 'Mua Hàng' },
                          { value: 'visit', label: 'Đặt Lịch Thăm' },
                          { value: 'collaboration', label: 'Hợp Tác' }
                        ].map((type) => (
                          <Chip
                            key={type.value}
                            label={type.label}
                            clickable
                            color={formData.inquiryType === type.value ? 'primary' : 'default'}
                            onClick={() => setFormData({ ...formData, inquiryType: type.value })}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      multiline
                      rows={6}
                      label="Nội Dung Tin Nhắn"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Vui lòng mô tả chi tiết yêu cầu của bạn..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{ textTransform: 'none' }}
                    >
                      Gửi Tin Nhắn
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Câu Hỏi Thường Gặp
              </Typography>
              
              {faqData.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}

              <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Không tìm thấy câu trả lời?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Đừng lo lắng! Đội ngũ của chúng tôi sẵn sàng giúp đỡ. Chuyển sang tab "Gửi Tin Nhắn" 
                  để liên hệ trực tiếp với câu hỏi cụ thể của bạn.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setTabValue(0)}
                  sx={{ textTransform: 'none' }}
                >
                  Liên Hệ Trực Tiếp
                </Button>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Paper elevation={2} sx={{ mt: 6, p: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Địa Chỉ Của Chúng Tôi
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Nhà kính và cơ sở nghiên cứu hoa lan của chúng tôi tọa lạc tại Biên Hòa - Đồng Nai. 
              Chúng tôi hoan nghênh khách tham quan theo lịch hẹn để xem bộ sưu tập và học về cách trồng hoa lan.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Địa chỉ:</strong> Biên Hòa - Đồng Nai<br />
              <strong>Giờ mở cửa:</strong> Thứ Hai - Thứ Sáu: 9:00 AM - 6:00 PM<br />
              <strong>Cuối tuần:</strong> Chỉ theo lịch hẹn<br />
              <strong>GitHub:</strong> <a href="https://github.com/Thanhtu18" target="_blank" rel="noopener noreferrer">https://github.com/Thanhtu18</a>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                height: 250, 
                bgcolor: 'grey.200', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Contact;