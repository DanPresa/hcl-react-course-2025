import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useProductsActions from '../../redux/products/useProductsActions';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  IconButton,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  Add,
  Remove,
  ArrowBack,
  LocalShipping,
  Replay,
} from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import { formatPrice, pricePerMonth } from '../../utils/formatCategories';
import useCartActions from '../../redux/cart/useCartActions';

const ProductDetails = () => {
  const { product, fetchProductById } = useProductsActions();
  const { addProduct, changeProductQuantity } = useCartActions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const { productId } = useParams();

  const handleAddProductToCartClick = (product: Product) => {
    addProduct(product, quantity);
  };

  const handleUpdateProductQuantityClick = (
    product: Product,
    amount: number
  ) => {
    changeProductQuantity(product, amount);
    setQuantity(amount);
  };

  useEffect(() => {
    if (!productId) return;

    fetchProductById(productId);
  }, [productId, fetchProductById]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 3, fontWeight: 'bold' }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Left: Product Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              image={selectedImage || product.images[0]}
              alt="Product"
              sx={{ maxWidth: '100%', borderRadius: 2 }}
            />
          </Card>

          {/* Thumbnails */}
          {product.images && (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}
            >
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 80,
                    height: 80,
                    cursor: 'pointer',
                    border: selectedImage === image ? '2px solid #000' : 'none',
                    transition: '0.3s',
                  }}
                  onClick={() => setSelectedImage(image)}
                >
                  <CardMedia component="img" image={image} alt="Thumbnail" />
                </Card>
              ))}
            </Box>
          )}
        </Grid>

        {/* Right: Product Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight="bold">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.reviews.length})
            </Typography>
          </Box>

          {/* Price */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            {formatPrice(product.price)}{' '}
            <Typography component="span" variant="body2" color="text.secondary">
              or ${pricePerMonth(product.price, 12)}/month
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Suggested payments with 6 months special financing
          </Typography>

          {/* Color Selection */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Choose a Color
          </Typography>

          {/* Quantity Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
            <IconButton
              disabled={quantity === 1}
              onClick={() =>
                handleUpdateProductQuantityClick(product, quantity - 1)
              }
            >
              <Remove />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton
              onClick={() =>
                handleUpdateProductQuantityClick(product, quantity + 1)
              }
            >
              <Add />
            </IconButton>

            {/* Stock Warning */}
            <Typography variant="body2" color="error">
              Only {product.stock} Items Left! Don't miss it
            </Typography>
          </Box>

          {/* Buy & Add to Cart Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ flex: 1, p: 1.5, fontWeight: 'bold' }}
            >
              Buy Now
            </Button>
            <Button
              variant="outlined"
              sx={{ flex: 1, p: 1.5, fontWeight: 'bold' }}
              onClick={() => handleAddProductToCartClick(product)}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Delivery Information */}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalShipping sx={{ color: 'green' }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Free Delivery
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Enter your Postal code for Delivery Availability
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Replay sx={{ color: 'blue' }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Return Delivery
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Free 30 days Delivery Returns. <u>Details</u>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
