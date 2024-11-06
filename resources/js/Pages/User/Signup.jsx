import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, FormControlLabel, Radio, RadioGroup, Paper, Snackbar
} from '@mui/material';
import { Link } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import MuiAlert from '@mui/material/Alert';

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
    <Paper elevation={3} sx={{ maxWidth: 400, marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', padding: 2, boxShadow: '0px 3px 15px rgba(0,0,0,0.2)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom >
          Tạo tài khoản mới
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nhanh chóng và dễ dàng.
        </Typography>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField 
            label="Họ" 
            variant="outlined" 
            fullWidth 
            name="cus_familyname"
            value={formData.cus_familyname}
            onChange={handleChange}
          />
          <TextField 
            label="Tên" 
            variant="outlined" 
            fullWidth 
            name="cus_name"
            value={formData.cus_name}
            onChange={handleChange}
          />
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Ngày sinh
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <TextField
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            name="cus_birthday"
            value={formData.cus_birthday}
            onChange={handleChange}
          />
        </Box>

        <Typography variant="subtitle2" gutterBottom>
          Giới tính
        </Typography>
        <RadioGroup 
          row 
          name="cus_sex"
          value={formData.cus_sex}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Nữ" />
          <FormControlLabel value="male" control={<Radio />} label="Nam" />
          <FormControlLabel value="custom" control={<Radio />} label="Tùy chỉnh" />
        </RadioGroup>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="cus_email"
          value={formData.cus_email}
          onChange={handleChange}
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Mật khẩu mới"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="cus_password"
          value={formData.cus_password}
          onChange={handleChange}
        />
        <Button 
          type="submit"
          variant="contained" 
          fullWidth 
          sx={{ mt: 2, backgroundColor: '#FFCC00', '&:hover': { backgroundColor: '#E6B800' } }}
        >
          Đăng ký
        </Button>
      </form>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link href="/signin">Bạn đã có tài khoản</Link>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SignUp;
