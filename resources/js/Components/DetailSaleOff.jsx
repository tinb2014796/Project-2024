import React from 'react';
import { Modal, Box, Typography, Button, Divider } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PercentIcon from '@mui/icons-material/Percent';

export default function DetailSaleOff({ open, handleClose, saleOff, products }) {
    const productName = saleOff?.products?.p_name || 'Không xác định';
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
                width: 450,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 3,
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                {saleOff ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocalOfferIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography id="modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                {saleOff.s_name}
                            </Typography>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#666' }}>
                                Loại khuyến mãi: Giảm giá theo phần trăm
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ShoppingBasketIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Sản phẩm: {productName}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PercentIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                Giá trị giảm: <span style={{ color: '#f44336' }}>{saleOff.s_percent}%</span>
                            </Typography>
                        </Box>

                        <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 2, mb: 2 }}>
                            <Typography sx={{ mb: 1 }}>
                                Giá trị tối thiểu: {formatCurrency(saleOff.s_value_min)}
                            </Typography>
                            <Typography>
                                Giảm tối đa: {formatCurrency(saleOff.s_value_max)}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CalendarTodayIcon sx={{ color: 'primary.main' }} />
                            <Box>
                                <Typography sx={{ color: '#666' }}>
                                    Bắt đầu: {formatDate(saleOff.s_start)}
                                </Typography>
                                <Typography sx={{ color: '#666' }}>
                                    Kết thúc: {formatDate(saleOff.s_end)}
                                </Typography>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Typography sx={{ mt: 2, textAlign: 'center', color: '#666' }}>
                        Không có thông tin giảm giá.
                    </Typography>
                )}
                <Box sx={{ mt: 3, textAlign: 'right' }}>
                    <Button 
                        onClick={handleClose} 
                        variant="contained" 
                        color="primary"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 4
                        }}
                    >
                        Đóng
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
