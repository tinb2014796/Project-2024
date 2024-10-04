import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Modal, TextField
} from '@mui/material';

export default function UpdateUserInfoModal({ open, onClose, user, onUpdate }) {
  const [editedUser, setEditedUser] = useState(user || {});

  useEffect(() => {
    setEditedUser(user || {});
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(editedUser);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Cập nhật thông tin
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={editedUser.email || ''}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            type="tel"
            value={editedUser.phone || ''}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="submit" variant="contained" color="primary">
              Lưu thay đổi
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
