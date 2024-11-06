import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, FormControlLabel, Switch, InputLabel, Grid, Checkbox, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link, usePage, router } from "@inertiajs/react";




export default function CreateSaleOff({ products }) {
    const [saleOffData, setSaleOffData] = useState({
        s_name: '',
        type: 'percent',
        s_percent: '',
        s_value_min: '',
        s_value_max: '', 
        autoApply: false,
        s_start: '',
        s_end: '',
        applyToStore: true,
        applyToOnline: false,
        p_id: []
    });

    const [openModal, setOpenModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [success, setSuccess] = useState(false);
    


    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setSaleOffData(prev => ({
            ...prev,
            [name]: e.target.type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        try {
            const formData = {
                s_name: saleOffData.s_name,
                s_value_min: saleOffData.s_value_min,
                s_value_max: saleOffData.s_value_max,
                s_percent: saleOffData.s_percent,
                s_start: saleOffData.s_start,
                s_end: saleOffData.s_end,
                p_id: saleOffData.p_id
            };
            
            router.post('/admin/sale-off/create', formData);
            setSuccess(true);
            setSaleOffData({});
        } catch (error) {
            console.error(error);
        }
    };
 

    const handleBack = () => {
        router.get('/admin/sale-off');
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleProductSelect = (productId) => {
        setSaleOffData(prev => {
            const currentProducts = Array.isArray(prev.p_id) ? prev.p_id : [];
            const isSelected = currentProducts.includes(productId);
            
            return {
                ...prev,
                p_id: isSelected 
                    ? currentProducts.filter(id => id !== productId)
                    : [...currentProducts, productId]
            };
        });
    };

    // Sắp xếp sản phẩm theo tên
    const sortedProducts = Array.isArray(products) 
        ? [...products].sort((a, b) => a.p_name.localeCompare(b.p_name))
        : [];

    const getSelectedProductNames = () => {
        if (!Array.isArray(saleOffData.p_id) || saleOffData.p_id.length === 0) {
            return 'Chọn sản phẩm';
        }
        
        const selectedNames = saleOffData.p_id
            .map(id => sortedProducts.find(p => p.id === id)?.p_name)
            .filter(Boolean);
            
        return selectedNames.join(', ');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontFamily: 'cursive', fontWeight: 'bold', color: '#33CCCC', display: 'flex', alignItems: 'center' }}>
                    Thêm khuyến mãi
                    <LocalOfferIcon sx={{ fontSize: '2rem', color: '#33CCCC', ml: 2 }} />
                </Typography>
                <Button 
                    variant="outlined" 
                    onClick={handleBack}
                    sx={{ ml: 2 }}
                >
                    Quay lại
                </Button>
            </Box>
            
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, mb: 3 }}>
                <TextField
                    name="s_name"
                    value={saleOffData.s_name}
                    onChange={handleChange}
                    fullWidth
                    label="Tên khuyến mại (*)"
                    placeholder="Nhập tên khuyến mại"
                    sx={{ mb: 3 }}
                />

                <Typography variant="h6" sx={{ mb: 2 }}>TÙY CHỌN KHUYẾN MẠI</Typography>
                
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Loại khuyến mại</InputLabel>
                            <Select 
                                name="type"
                                value={saleOffData.type}
                                onChange={handleChange}
                            >
                                <MenuItem value="percent">Theo phần trăm</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="s_percent"
                            value={saleOffData.s_percent}
                            onChange={handleChange}
                            fullWidth
                            label="Giá trị (*)"
                            placeholder="0 %"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="s_value_min"
                            value={saleOffData.s_value_min}
                            onChange={handleChange}
                            fullWidth
                            label="Giá trị hóa đơn tối thiểu"
                            placeholder="0 đ"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="s_value_max"
                            value={saleOffData.s_value_max}
                            onChange={handleChange}
                            fullWidth
                            label="Giảm giá tối đa"
                            placeholder="0 đ"
                            type="number"
                        />
                    </Grid>
                </Grid>
            </Box>


            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>THỜI GIAN ÁP DỤNG</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            name="s_start"
                            value={saleOffData.s_start}
                            onChange={handleChange}
                            fullWidth
                            label="Ngày bắt đầu"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="s_end"
                            value={saleOffData.s_end}
                            onChange={handleChange}
                            fullWidth
                            label="Ngày kết thúc"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Chọn sản phẩm áp dụng</Typography>
                <Button 
                    variant="outlined" 
                    onClick={handleOpenModal}
                    fullWidth
                    sx={{ height: '56px', justifyContent: 'flex-start', textAlign: 'left' }}
                >
                    {getSelectedProductNames()}
                </Button>

                <Dialog 
                    open={openModal} 
                    onClose={handleCloseModal}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>Chọn sản phẩm</DialogTitle>
                    <DialogContent>
                        <List sx={{ width: '100%' }}>
                            {sortedProducts.map((product) => (
                                <ListItem 
                                    key={product.id}
                                    button 
                                    onClick={() => handleProductSelect(product.id)}
                                    sx={{ 
                                        borderBottom: '1px solid #eee',
                                        '&:hover': { backgroundColor: '#f5f5f5' }
                                    }}
                                >
                                    <Checkbox 
                                        checked={Array.isArray(saleOffData.p_id) && saleOffData.p_id.includes(product.id)}
                                        onChange={() => {}}
                                    />
                                    <ListItemText primary={product.p_name} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                </Dialog>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    Tạo khuyến mãi
                </Button>
            </Box>
        </Box>
    );
}
