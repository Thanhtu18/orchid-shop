import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Rating,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import {
  fetchOrchids,
  deleteOrchid,
  selectAllOrchids,
  selectOrchidsLoading,
  selectOrchidsError
} from '../store/slices/orchidsSlice';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import OrchidForm from './OrchidForm';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const orchids = useSelector(selectAllOrchids);
  const loading = useSelector(selectOrchidsLoading);
  const error = useSelector(selectOrchidsError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Component state
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [orchidToDelete, setOrchidToDelete] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      dispatch(fetchOrchids());
    }
  }, [isAuthenticated, navigate, dispatch]);

  // Handle opening create form
  const handleOpenCreateForm = () => {
    setSelectedOrchid(null);
    setFormDialogOpen(true);
  };

  // Handle opening edit form
  const handleOpenEditForm = (orchid) => {
    setSelectedOrchid(orchid);
    setFormDialogOpen(true);
  };

  // Handle closing form
  const handleCloseForm = () => {
    setFormDialogOpen(false);
    setSelectedOrchid(null);
  };

  // Handle opening delete confirmation
  const handleOpenDeleteDialog = (orchid) => {
    setOrchidToDelete(orchid);
    setDeleteDialogOpen(true);
  };

  // Handle closing delete dialog
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setOrchidToDelete(null);
  };

  // Handle confirming delete
  const handleConfirmDelete = async () => {
    if (orchidToDelete) {
      try {
        await dispatch(deleteOrchid(orchidToDelete.id)).unwrap();
        handleCloseDeleteDialog();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  // Handle viewing orchid details
  const handleViewDetails = (orchidId) => {
    navigate(`/detail/${orchidId}`);
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" style={{ marginTop: '32px' }}>
        <Alert severity="warning">
          Bạn cần đăng nhập để truy cập trang quản trị.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="xl" style={{ marginTop: '32px', textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Đang tải dữ liệu...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" style={{ marginTop: '32px', marginBottom: '32px' }}>
      {/* Header */}
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          style={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🛠️ Quản Trị Hoa Lan
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateForm}
          size="large"
          style={{
            background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Thêm Hoa Lan Mới
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" style={{ marginBottom: '24px' }}>
          Lỗi: {error}
        </Alert>
      )}

      {/* Statistics */}
      <Box style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Paper elevation={3} style={{ padding: '16px', flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" color="primary" style={{ fontWeight: 'bold' }}>
            {orchids.length}
          </Typography>
          <Typography variant="body1">Tổng số hoa lan</Typography>
        </Paper>
        
        <Paper elevation={3} style={{ padding: '16px', flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" color="secondary" style={{ fontWeight: 'bold' }}>
            {orchids.filter(o => o.isSpecial).length}
          </Typography>
          <Typography variant="body1">Loài đặc biệt</Typography>
        </Paper>
        
        <Paper elevation={3} style={{ padding: '16px', flex: 1, textAlign: 'center' }}>
          <Typography variant="h4" color="success.main" style={{ fontWeight: 'bold' }}>
            {orchids.filter(o => o.isNatural).length}
          </Typography>
          <Typography variant="body1">Loài tự nhiên</Typography>
        </Paper>
      </Box>

      {/* Orchids Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Hình ảnh</strong></TableCell>
              <TableCell><strong>Tên</strong></TableCell>
              <TableCell><strong>Danh mục</strong></TableCell>
              <TableCell><strong>Nguồn gốc</strong></TableCell>
              <TableCell><strong>Đánh giá</strong></TableCell>
              <TableCell><strong>Lượt thích</strong></TableCell>
              <TableCell><strong>Thuộc tính</strong></TableCell>
              <TableCell align="center"><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orchids.map((orchid) => (
              <TableRow key={orchid.id} hover>
                <TableCell>
                  <Avatar
                    src={orchid.image}
                    alt={orchid.name}
                    style={{ width: 60, height: 60 }}
                    variant="rounded"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                    {orchid.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Màu: {orchid.color}
                  </Typography>
                </TableCell>
                <TableCell>{orchid.category}</TableCell>
                <TableCell>{orchid.origin}</TableCell>
                <TableCell>
                  <Rating value={orchid.rating} readOnly size="small" />
                  <Typography variant="caption" display="block">
                    {orchid.rating}/5
                  </Typography>
                </TableCell>
                <TableCell>{orchid.numberOfLike?.toLocaleString() || 0}</TableCell>
                <TableCell>
                  <Box style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {orchid.isSpecial && (
                      <Chip label="Đặc biệt" size="small" color="secondary" />
                    )}
                    {orchid.isNatural && (
                      <Chip label="Tự nhiên" size="small" color="success" />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <IconButton
                      onClick={() => handleViewDetails(orchid.id)}
                      color="info"
                      title="Xem chi tiết"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenEditForm(orchid)}
                      color="primary"
                      title="Chỉnh sửa"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(orchid)}
                      color="error"
                      title="Xóa"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Empty State */}
      {orchids.length === 0 && !loading && (
        <Box style={{ textAlign: 'center', marginTop: '48px' }}>
          <Typography variant="h5" color="textSecondary">
            Chưa có hoa lan nào
          </Typography>
          <Typography variant="body1" color="textSecondary" style={{ marginTop: '8px' }}>
            Hãy thêm hoa lan đầu tiên của bạn
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateForm}
            style={{ marginTop: '16px' }}
          >
            Thêm Hoa Lan
          </Button>
        </Box>
      )}



      {/* Form Dialog */}
      <OrchidForm
        open={formDialogOpen}
        onClose={handleCloseForm}
        orchid={selectedOrchid}
        mode={selectedOrchid ? "edit" : "create"}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Xác nhận xóa hoa lan
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Bạn có chắc chắn muốn xóa hoa lan "{orchidToDelete?.name}"? 
            Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;