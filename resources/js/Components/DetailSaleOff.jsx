import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

export default function DetailSaleOff({ open, handleClose, saleOff, products }) {
    const productName = products ? products.find(product => product.id === saleOff.p_id)?.p_name || 'Không xác định' : 'Không xác định';

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
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
                borderRadius: 2
            }}>
                {saleOff ? (
                    <>
                        <Typography id="modal-title" variant="h6" component="h2">
                            {saleOff.s_name}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Loại khuyến mãi: Giảm giá theo phần trăm
                        </Typography>
                        {/* <Typography sx={{ mt: 1 }}>
                            Tên sản phẩm: {productName}
                        </Typography> */}
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            Giá trị giảm: {saleOff.s_percent}%
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Giá trị tối thiểu: {formatCurrency(saleOff.s_value_min)}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Giảm tối đa: {formatCurrency(saleOff.s_value_max)}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Bắt đầu: {formatDate(saleOff.s_start)}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Kết thúc: {formatDate(saleOff.s_end)}
                        </Typography>
                    </>
                ) : (
                    <Typography sx={{ mt: 2 }}>
                        Không có thông tin giảm giá.
                    </Typography>
                )}
                <Button onClick={handleClose} sx={{ mt: 3 }} variant="contained" color="primary">
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
}
