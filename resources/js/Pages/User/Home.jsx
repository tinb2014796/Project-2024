import React, { useEffect } from 'react';
import { Typography, Grid, Paper, Box, Card, CardMedia, CardContent, Chip, Icon } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

function CategoryItem({ category }) {
  return (
    <Card elevation={0} sx={{ textAlign: 'center', p: 2 }}>
      <Link href={`/user/category-product/${category.id}`}>
        <Box
          component="img"
          src={category.c_image}
          alt={category.c_name}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            mb: 2,
            cursor: 'pointer',
            objectFit: 'cover'
          }}
        />
      </Link>
      <Typography variant="subtitle1" gutterBottom>
        {category.c_name}
      </Typography>
    </Card>
  );
}

function ProductItem({ product }) {
  const maxDiscount = product.sale_off ? Math.max(...product.sale_off.map(sale => sale.s_percent)) : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Link href={`/user/detail-product/${product.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ position: 'relative', borderRadius: 2, boxShadow: 3 }}>
        {maxDiscount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              bgcolor: '#ff4d4f',
              color: 'white',
              px: 1,
              py: 0.5,
              zIndex: 1,
              borderBottomLeftRadius: 8
            }}
          >
            -{maxDiscount}%
          </Box>
        )}
        
        <CardMedia
          component="img"
          height="140"
          image={product.images[0].ip_image}
          alt={product.p_name}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 2 }}>
          <Typography variant="body2" noWrap>{product.p_name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {maxDiscount > 0 ? (
              <>
                <Typography variant="subtitle1" color="error">
                  {formatPrice(product.p_selling * (1 - maxDiscount / 100))}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  {formatPrice(product.p_selling || 0)}
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle1" color="error">
                {formatPrice(product.p_selling)}
              </Typography>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">Số lượng: {product.p_quantity}</Typography>
          <Typography variant="body2" color="text.secondary" noWrap>{product.p_description}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

function InfoItem({ icon, title, description }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Icon component={icon} sx={{ fontSize: 40, mb: 1 }} />
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </Box>
  );
}

function Home() {
  const { products, categories } = usePage().props;
  return (
    <Box sx={{ p: 4 }}>
      <Typography 
      textAlign="center"
      color="#FFCC33"
      variant="h3" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Roboto', mb: 4 }}>
        Nghệ Shop 
      </Typography>
      
      {/* Hình ảnh banner lớn */}
      <Box sx={{ mb: 4, width: '100%', height: '400px', overflow: 'hidden' }}>
        <img 
          src="/images/sunhouse-mama-shd5353w_0118(1).jpg" 
          alt="Banner sản phẩm" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center'
          }} 
        />
      </Box>
      
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoItem 
            icon={LocalShippingIcon}
            title="Vận chuyển toàn quốc"
            description="Vận chuyển nhanh chóng"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoItem 
            icon={CardGiftcardIcon}
            title="Ưu đãi hấp dẫn"
            description="Nhiều ưu đãi khuyến mãi hot"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoItem 
            icon={VerifiedIcon}
            title="Bảo đảm chất lượng"
            description="Sản phẩm đã được kiểm định"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoItem 
            icon={PhoneIcon}
            title="Hotline: 0345291448"
            description="Vui lòng gọi hotline để hỗ trợ"
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {categories.map((category, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <CategoryItem category={category} />
          </Grid>
        ))}
      </Grid>
      
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Sản phẩm nổi bật
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;