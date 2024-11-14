import { Box, Typography, Button, Avatar, Rating as MuiRating } from '@mui/material';

export default function RatingComponent() {
  return (
    <Box sx={{ mt: 2, bgcolor: '#fff', p: 2, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
          ĐÁNH GIÁ SẢN PHẨM
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ color: 'red', mr: 1 }}>
            4.9
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            trên 5
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small">Tất Cả</Button>
          <Button variant="outlined" size="small">5 Sao (6)</Button>
          <Button variant="outlined" size="small">4 Sao (1)</Button>
          <Button variant="outlined" size="small">3 Sao (0)</Button>
          <Button variant="outlined" size="small">2 Sao (0)</Button>
          <Button variant="outlined" size="small">1 Sao (0)</Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Button variant="outlined" size="small">Có Bình Luận (3)</Button>
          <Button variant="outlined" size="small">Có Hình Ảnh / Video (3)</Button>
        </Box>

        {/* Example Review Item */}
        <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ mr: 2 }}>U</Avatar>
            <Box>
              <Typography variant="subtitle2">Người dùng Shopee</Typography>
              <MuiRating value={5} readOnly size="small" />
            </Box>
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            2021-09-13 14:55 | Phân loại hàng: Headphone Stand Đen
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 2 }}>
            Móc to đẹp chắc chắn cứng cáp rất ổn mùa dịch ship được sau 2 ngày là quá ổn.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Review Images */}
            <Box component="img" src="/path-to-image1.jpg" sx={{ width: 80, height: 80, objectFit: 'cover' }} />
            <Box component="img" src="/path-to-image2.jpg" sx={{ width: 80, height: 80, objectFit: 'cover' }} />
            <Box component="img" src="/path-to-image3.jpg" sx={{ width: 80, height: 80, objectFit: 'cover' }} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="primary">Phản Hồi Của Người Bán</Typography>
            <Typography variant="body2">
              Cảm ơn bạn đã mua hàng tại Shop mình. Hy vọng rằng bạn đã có một trải nghiệm mua hàng ưng ý. 
              Nếu bạn hài lòng với sản phẩm và dịch vụ của Shop mình thì hãy cho mình một đánh giá 5* để chúng tớ có thêm động lực để làm tốt hơn nữa.
              Nếu có gì chưa hài lòng hoặc cần tư vấn thêm thì bạn hãy inbox hoặc gọi điện ngay vào hotline 0942812999 để chúng tớ giải quyết cho bạn nhé. 
              Chúc bạn một ngày vui vẻ!
            </Typography>
          </Box>
        </Box>
    </Box>
  );
}