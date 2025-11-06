import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createOrchid, updateOrchid } from '../store/slices/orchidsSlice';
import { selectOrchidsLoading } from '../store/slices/orchidsSlice';

// Validation schema
const orchidValidationSchema = Yup.object({
  name: Yup.string()
    .required('Tên hoa lan là bắt buộc')
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(100, 'Tên không được quá 100 ký tự'),
  category: Yup.string()
    .required('Danh mục là bắt buộc'),
  color: Yup.string()
    .required('Màu sắc là bắt buộc'),
  origin: Yup.string()
    .required('Xuất xứ là bắt buộc'),
  rating: Yup.number()
    .required('Đánh giá là bắt buộc')
    .min(1, 'Đánh giá tối thiểu là 1')
    .max(5, 'Đánh giá tối đa là 5'),
  numberOfLike: Yup.number()
    .required('Số lượt thích là bắt buộc')
    .min(0, 'Số lượt thích không được âm'),
  image: Yup.string()
    .url('URL hình ảnh không hợp lệ')
    .required('URL hình ảnh là bắt buộc'),
  description: Yup.string()
    .required('Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả không được quá 500 ký tự'),
  videoClip: Yup.string()
    .url('URL video không hợp lệ'),
});

const categories = [
  'Cattleya',
  'Phalaenopsis', 
  'Oncidium',
  'Cymbidium',
  'Paphiopedilum',
  'Miltonia',
  'Brassia',
  'Zygopetalum',
  'Epidendrum',
  'Masdevallia',
  'Bulbophyllum',
  'Laelia',
  'Vanilla',
  'Ludisia'
];

const OrchidForm = ({ open, onClose, orchid = null, mode = 'create' }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectOrchidsLoading);

  const initialValues = {
    name: orchid?.name || '',
    category: orchid?.category || '',
    color: orchid?.color || '',
    origin: orchid?.origin || '',
    rating: orchid?.rating || 1,
    numberOfLike: orchid?.numberOfLike || 0,
    image: orchid?.image || '',
    description: orchid?.description || '',
    videoClip: orchid?.videoClip || '',
    isSpecial: orchid?.isSpecial || false,
    isNatural: orchid?.isNatural || false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (mode === 'edit' && orchid) {
        await dispatch(updateOrchid({ id: orchid.id, data: values })).unwrap();
      } else {
        await dispatch(createOrchid(values)).unwrap();
      }
      
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error saving orchid:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        style: { minHeight: '80vh' }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="h2">
          {mode === 'edit' ? 'Chỉnh sửa hoa lan' : 'Thêm hoa lan mới'}
        </Typography>
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={orchidValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleBlur, isSubmitting, touched, errors }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={3}>
                {/* Name */}
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Tên hoa lan *"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                {/* Category */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined" error={touched.category && Boolean(errors.category)}>
                    <InputLabel>Danh mục *</InputLabel>
                    <Field
                      as={Select}
                      name="category"
                      label="Danh mục *"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }} />
                  </FormControl>
                </Grid>

                {/* Color */}
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    name="color"
                    label="Màu sắc *"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.color}
                    error={touched.color && Boolean(errors.color)}
                    helperText={touched.color && errors.color}
                  />
                </Grid>

                {/* Origin */}
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    name="origin"
                    label="Xuất xứ *"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.origin}
                    error={touched.origin && Boolean(errors.origin)}
                    helperText={touched.origin && errors.origin}
                  />
                </Grid>

                {/* Rating */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined" error={touched.rating && Boolean(errors.rating)}>
                    <InputLabel>Đánh giá *</InputLabel>
                    <Field
                      as={Select}
                      name="rating"
                      label="Đánh giá *"
                      value={values.rating}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <MenuItem key={rating} value={rating}>
                          {rating} ⭐
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage name="rating" component="div" style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }} />
                  </FormControl>
                </Grid>

                {/* Number of Likes */}
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    name="numberOfLike"
                    label="Số lượt thích *"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numberOfLike}
                    error={touched.numberOfLike && Boolean(errors.numberOfLike)}
                    helperText={touched.numberOfLike && errors.numberOfLike}
                  />
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="image"
                    label="URL hình ảnh *"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    error={touched.image && Boolean(errors.image)}
                    helperText={touched.image && errors.image}
                  />
                </Grid>

                {/* Video URL */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="videoClip"
                    label="URL video (tùy chọn)"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.videoClip}
                    error={touched.videoClip && Boolean(errors.videoClip)}
                    helperText={touched.videoClip && errors.videoClip}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="description"
                    label="Mô tả *"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                {/* Checkboxes */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="isSpecial"
                          checked={values.isSpecial}
                          onChange={handleChange}
                        />
                      }
                      label="Hoa lan đặc biệt"
                    />
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="isNatural"
                          checked={values.isNatural}
                          onChange={handleChange}
                        />
                      }
                      label="Hoa lan tự nhiên"
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose} disabled={isSubmitting}>
                Hủy
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={isSubmitting || loading}
              >
                {loading || isSubmitting ? 'Đang xử lý...' : (mode === 'edit' ? 'Cập nhật' : 'Thêm mới')}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default OrchidForm;