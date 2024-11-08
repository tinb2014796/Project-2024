import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    TextField
} from '@mui/material';


const CancelOrder = ({ open, onClose, onSubmit, orderId }) => {
    const [or_note, setOrNote] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleSubmit = () => {
        setOpenConfirm(true);
    };

    const handleConfirm = () => {
        onSubmit({ orderId, or_note });
        setOrNote('');
        setOpenConfirm(false);
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h6">Xác nhận hủy đơn hàng</Typography>
                </DialogTitle>
                
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Bạn có chắc chắn muốn hủy đơn hàng #{orderId} không?
                        </Typography>
                        
                        <FormControl fullWidth>
                            <TextField
                                label="Lý do hủy đơn"
                                multiline
                                rows={4}
                                value={or_note}
                                onChange={(e) => setOrNote(e.target.value)}
                                placeholder="Vui lòng nhập lý do hủy đơn hàng..."
                                required
                            />
                        </FormControl>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} variant="outlined" color="inherit">
                        Đóng
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        variant="contained"
                        color="error"
                        disabled={!or_note.trim()}
                    >
                        Xác nhận hủy
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>
                    <Typography variant="h6">Xác nhận lại</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn hủy đơn hàng này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} color="inherit">
                        Không
                    </Button>
                    <Button onClick={handleConfirm} color="error" variant="contained">
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CancelOrder;