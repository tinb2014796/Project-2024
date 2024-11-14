import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, Typography, Button } from '@mui/material';

const DetailGoodsReceipt = ({openDetailDialog, handleCloseDetailDialog, selectedReceipt}) => {
    return (
        <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{
                bgcolor: '#14B8B9',
                color: 'white',
                fontWeight: 'bold'
            }}>
                Chi tiết phiếu nhập hàng #{selectedReceipt?.id}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                                <Typography><strong>Ngày nhập:</strong> {selectedReceipt?.import_date}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                                <Typography><strong>Nhà cung cấp:</strong> {selectedReceipt?.brand?.b_name}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ 
                                mt: 2, 
                                mb: 2,
                                color: '#14B8B9',
                                fontWeight: 'bold'
                            }}>
                                Danh sách sản phẩm
                            </Typography>
                            <Box sx={{ 
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                overflow: 'hidden'
                            }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#14B8B9' }}>
                                            <th style={{ padding: '12px', color: 'white' }}>Sản phẩm</th>
                                            <th style={{ padding: '12px', color: 'white' }}>Số lượng</th>
                                            <th style={{ padding: '12px', color: 'white' }}>Giá nhập</th>
                                            <th style={{ padding: '12px', color: 'white' }}>Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedReceipt?.goods_receipt_details?.map((detail) => (
                                            <tr key={detail.id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '12px' }}>{detail.product?.p_name}</td>
                                                <td style={{ padding: '12px', textAlign: 'center' }}>{detail.quantity_import}</td>
                                                <td style={{ padding: '12px', textAlign: 'right' }}>{detail.price?.toLocaleString()}đ</td>
                                                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>{(detail.quantity_import * detail.price).toLocaleString()}đ</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button 
                    onClick={handleCloseDetailDialog}
                    sx={{
                        color: '#666',
                        '&:hover': {
                            bgcolor: '#f5f5f5'
                        }
                    }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailGoodsReceipt;
