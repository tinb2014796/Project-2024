import React from 'react'
import { Box, Typography, Button, Paper, Grid, Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatIcon from '@mui/icons-material/Chat'
import StorefrontIcon from '@mui/icons-material/Storefront'

const Repay = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FavoriteIcon color="error" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">YJBelts.vn</Typography>
          </Grid>
          <Grid item>
            <Button startIcon={<ChatIcon />} variant="outlined" size="small">Chat</Button>
          </Grid>
          <Grid item>
            <Button startIcon={<StorefrontIcon />} variant="outlined" size="small">Xem Shop</Button>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2, display: 'flex' }}>
          <Avatar
            variant="square"
            src="/images/banphim.webp"
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="body1">
              Ốp lưng Realme C53 Realme C51 Ốp Điện Thoại tpu Fashion Angel Eyes TSY vỏ mềm vỏ điện thoại Realme C53 Realme C51
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phân loại hàng: LuFei,Realme C53
            </Typography>
            <Typography variant="body2" color="text.secondary">
              x1
            </Typography>
            <Typography variant="body2" color="primary">
              Trả hàng miễn phí 15 ngày
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="error">
            đ31,500
          </Typography>
          <Box>
            <Button variant="contained" color="warning" sx={{ mr: 1 }}>Mua Lại</Button>
            <Button variant="outlined">Liên Hệ Người Bán</Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Thêm các mục khác tương tự ở đây */}
    </Box>
  )
}

export default Repay
