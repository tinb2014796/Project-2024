import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const CreateGoodsReceipt = ({openDialog, handleCloseDialog, brands, 
    products, formData, setFormData, handleSubmit, handleAddProduct,
    handleProductChange, handleRemoveProduct,
}) => {
    // Lọc sản phẩm theo nhà cung cấp được chọn
    const filteredProducts = products?.filter(product => 
        formData.brand_id ? product.b_id == formData.brand_id : false
    );

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{
                bgcolor: '#14B8B9',
                color: 'white',
                fontWeight: 'bold'
            }}>
                Tạo phiếu nhập hàng mới
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Ngày nhập"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formData.import_date}
                                onChange={(e) => setFormData({...formData, import_date: e.target.value})}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#14B8B9',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Nhà cung cấp</InputLabel>
                                <Select
                                    value={formData.brand_id}
                                    label="Nhà cung cấp"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData, 
                                            brand_id: e.target.value,
                                            products: [{
                                                product_id: '',
                                                quantity: 0,
                                                price: 0
                                            }]
                                        });
                                    }}
                                    sx={{
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#14B8B9',
                                        },
                                    }}
                                >
                                    {brands?.map((brand) => (
                                        <MenuItem key={brand.id} value={brand.id}>{brand.b_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#14B8B9' }}>
                                Chi tiết sản phẩm
                            </Typography>
                        </Grid>

                        {formData.products.map((product, index) => (
                            <Grid item xs={12} key={index}>
                                <Box sx={{ 
                                    p: 2, 
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 1,
                                    position: 'relative'
                                }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth required>
                                                <InputLabel>Sản phẩm</InputLabel>
                                                <Select
                                                    value={product.product_id}
                                                    label="Sản phẩm"
                                                    onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                                                    disabled={!formData.brand_id}
                                                    sx={{
                                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                                            borderColor: '#14B8B9',
                                                        },
                                                    }}
                                                >
                                                    {filteredProducts?.map((p) => (
                                                        <MenuItem key={p.id} value={p.id}>{p.p_name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                label="Số lượng"
                                                type="number"
                                                value={product.quantity}
                                                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': {
                                                            borderColor: '#14B8B9',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                label="Giá nhập"
                                                type="number"
                                                value={product.price}
                                                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                                                required
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': {
                                                            borderColor: '#14B8B9',
                                                        },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <IconButton 
                                        sx={{ 
                                            position: 'absolute',
                                            top: -12,
                                            right: -12,
                                            bgcolor: '#ff4444',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: '#cc0000'
                                            },
                                            display: formData.products.length === 1 ? 'none' : 'flex'
                                        }}
                                        size="small"
                                        onClick={() => handleRemoveProduct(index)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                        
                        <Grid item xs={12}>
                            <Button 
                                onClick={handleAddProduct} 
                                variant="outlined"
                                startIcon={<AddIcon />}
                                disabled={!formData.brand_id}
                                sx={{
                                    color: '#14B8B9',
                                    borderColor: '#14B8B9',
                                    '&:hover': {
                                        borderColor: '#14B8B9',
                                        bgcolor: 'rgba(20, 184, 185, 0.1)'
                                    }
                                }}
                            >
                                Thêm sản phẩm
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button 
                    onClick={handleCloseDialog}
                    sx={{
                        color: '#666',
                        '&:hover': {
                            bgcolor: '#f5f5f5'
                        }
                    }}
                >
                    Hủy
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    sx={{ 
                        bgcolor: '#14B8B9',
                        '&:hover': {
                            bgcolor: '#0e8e8f'
                        }
                    }}
                >
                    Tạo phiếu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateGoodsReceipt;