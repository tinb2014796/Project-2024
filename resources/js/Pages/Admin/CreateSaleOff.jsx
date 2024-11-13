import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, FormControl, FormControlLabel, Switch, InputLabel, Grid, Checkbox, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Tabs, Tab } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link, usePage, router } from "@inertiajs/react";

export default function CreateSaleOff({ products }) {
    const [tabValue, setTabValue] = useState(0);
    
    const [saleOffData, setSaleOffData] = useState({
        s_name: '',
        s_type: 'percent',
        s_code: '',
        s_percent: '',
        s_start: '',
        s_end: '', 
        p_id: []
    });

    const [voucherData, setVoucherData] = useState({
        s_name: '',
        s_type: 'voucher',
        s_code: '',
        s_percent: '',
        s_value_min: '',
        s_value_max: '',
        s_quantity: '',
        s_start: '',
        s_end: '',
        s_catalory: '1'
    });
    console.log(voucherData);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (tabValue === 0) {
            setSaleOffData(prev => ({
                ...prev,
                [name]: e.target.type === 'checkbox' ? checked : value
            }));
        } else {
            setVoucherData(prev => ({
                ...prev,
                [name]: e.target.type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async () => {
        try {
            if (tabValue === 0) {
                const formData = {
                    s_name: saleOffData.s_name,
                    s_type: saleOffData.s_type,
                    s_code: saleOffData.s_code,
                    s_percent: saleOffData.s_percent,
                    s_start: saleOffData.s_start,
                    s_end: saleOffData.s_end,
                    p_id: saleOffData.p_id
                };
                router.post('/admin/sale-off/create', formData);
            } else {
                const formData = {
                    s_name: voucherData.s_name,
                    s_type: voucherData.s_type,
                    s_code: voucherData.s_code,
                    s_percent: voucherData.s_catalory === '1' ? voucherData.s_percent : null,
                    s_value_min: voucherData.s_value_min,
                    s_value_max: voucherData.s_catalory === '2' ? voucherData.s_value_max : null,
                    s_quantity: voucherData.s_quantity,
                    s_start: voucherData.s_start,
                    s_end: voucherData.s_end,
                    s_catalory: voucherData.s_catalory
                };
                router.post('/admin/sale-off/create', formData);
            }
            setSuccess(true);
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
        if (tabValue === 0) {
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
        }
    };

    const sortedProducts = Array.isArray(products) 
        ? [...products].sort((a, b) => a.p_name.localeCompare(b.p_name))
        : [];

    const getSelectedProductNames = () => {
        const currentData = tabValue === 0 ? saleOffData : voucherData;
        if (!Array.isArray(currentData.p_id) || currentData.p_id.length === 0) {
            return 'Chọn sản phẩm';
        }
        
        const selectedNames = currentData.p_id
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

            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Tạo khuyến mãi" />
                <Tab label="Tạo voucher" />
            </Tabs>

            {tabValue === 0 ? (
                // Form tạo khuyến mãi
                <>
                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, mb: 3 }}>
                        <TextField
                            name="s_name"
                            value={saleOffData.s_name}
                            onChange={handleChange}
                            fullWidth
                            label="Tên khuyến mãi (*)"
                            placeholder="Nhập tên khuyến mãi"
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="h6" sx={{ mb: 2 }}>TÙY CHỌN KHUYẾN MẠI</Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    name="s_percent"
                                    value={saleOffData.s_percent}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Phần trăm giảm giá (*)"
                                    placeholder="0 %"
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </>
            ) : (
                // Form tạo voucher
                <>
                    <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, mb: 3 }}>
                        <TextField
                            name="s_name"
                            value={voucherData.s_name}
                            onChange={handleChange}
                            fullWidth
                            label="Tên voucher (*)"
                            placeholder="Nhập tên voucher"
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            name="s_code"
                            value={voucherData.s_code}
                            onChange={handleChange}
                            fullWidth
                            label="Mã voucher (*)"
                            placeholder="Nhập mã voucher"
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="h6" sx={{ mb: 2 }}>TÙY CHỌN VOUCHER</Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Loại voucher</InputLabel>
                                    <Select 
                                        name="s_catalory"
                                        value={voucherData.s_catalory}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="1">Theo phần trăm</MenuItem>
                                        <MenuItem value="2">Theo số tiền</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {voucherData.s_catalory === '1' && (
                                <Grid item xs={6}>
                                    <TextField
                                        name="s_percent"
                                        value={voucherData.s_percent}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Phần trăm giảm giá (*)"
                                        placeholder="0 %"
                                        type="number"
                                    />
                                </Grid>
                            )}
                            {voucherData.s_catalory === '2' && (
                                <Grid item xs={12}>
                                    <TextField
                                        name="s_value_max"
                                        value={voucherData.s_value_max}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Giảm giá tối đa"
                                        placeholder="0 đ"
                                        type="number"
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <TextField
                                    name="s_quantity"
                                    value={voucherData.s_quantity}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Số lượng voucher"
                                    placeholder="Nhập số lượng voucher"
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}

            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>THỜI GIAN ÁP DỤNG</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField
                            name="s_start"
                            value={tabValue === 0 ? saleOffData.s_start : voucherData.s_start}
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
                            value={tabValue === 0 ? saleOffData.s_end : voucherData.s_end}
                            onChange={handleChange}
                            fullWidth
                            label="Ngày kết thúc"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
            </Box>

            {tabValue === 0 && (
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
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                >
                    {tabValue === 0 ? 'Tạo khuyến mãi' : 'Tạo voucher'}
                </Button>
            </Box>
        </Box>
    );
}
