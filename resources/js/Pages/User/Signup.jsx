import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, FormControlLabel, Radio, RadioGroup, Paper, Snackbar
} from '@mui/material';
import { Link } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  maxWidth: 400,
  margin: '50px auto',
  padding: '30px',
  textAlign: 'center',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.15)',
  borderRadius: '12px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '15px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#00CED1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00CED1',
    },
  },
});

const StyledButton = styled(Button)({
  padding: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '8px',
  textTransform: 'none',
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    cus_name: '',
    cus_familyname: '',
    cus_sdt: '',
    cus_email: '',
    cus_password: '',
    cus_sex: '',
    cus_birthday: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'cus_email') {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await router.post('/signup', formData);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        if (error.response.data.errors && error.response.data.errors.cus_email) {
          setEmailError('Email đã tồn tại. Vui lòng sử dụng email khác.');
        } else {
          setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
          setOpenSnackbar(true);
        }
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          TẠO TÀI KHOẢN MỚI
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          Bạn đã có tài khoản? <Link href="/signin" style={{ color: '#00CED1', textDecoration: 'none', fontWeight: 'bold' }}>Đăng nhập tại đây</Link>
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <StyledTextField 
              label="Họ" 
              variant="outlined" 
              fullWidth 
              required
              name="cus_familyname"
              value={formData.cus_familyname}
              onChange={handleChange}
            />
            <StyledTextField 
              label="Tên" 
              variant="outlined" 
              fullWidth 
              required
              name="cus_name"
              value={formData.cus_name}
              onChange={handleChange}
            />
          </Box>

          <StyledTextField
            label="Số điện thoại"
            variant="outlined"
            fullWidth
            required
            name="cus_sdt"
            value={formData.cus_sdt}
            onChange={handleChange}
          />

          <StyledTextField
            type="date"
            label="Ngày sinh"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            name="cus_birthday"
            value={formData.cus_birthday}
            onChange={handleChange}
          />

          <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
            <Typography variant="subtitle2" gutterBottom>
              Giới tính
            </Typography>
            <RadioGroup 
              row 
              name="cus_sex"
              value={formData.cus_sex}
              onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio sx={{ color: '#00CED1' }} />} label="Nữ" />
              <FormControlLabel value="male" control={<Radio sx={{ color: '#00CED1' }} />} label="Nam" />
              <FormControlLabel value="custom" control={<Radio sx={{ color: '#00CED1' }} />} label="Tùy chỉnh" />
            </RadioGroup>
          </FormControl>

          <StyledTextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            name="cus_email"
            value={formData.cus_email}
            onChange={handleChange}
            error={!!emailError}
            helperText={emailError}
          />

          <StyledTextField
            label="Mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            required
            name="cus_password"
            value={formData.cus_password}
            onChange={handleChange}
          />

          <StyledButton 
            type="submit"
            variant="contained" 
            fullWidth 
            sx={{ 
              backgroundColor: '#00CED1',
              '&:hover': {
                backgroundColor: '#008B8B'
              },
              mt: 2
            }}
          >
            Đăng ký
          </StyledButton>
        </form>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </StyledPaper>
    </Box>
  );
};

export default SignUp;
