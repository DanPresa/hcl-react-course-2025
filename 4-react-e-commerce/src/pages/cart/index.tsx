import { useNavigate } from 'react-router';
import useCartActions from '../../redux/cart/useCartActions';
import { formatPrice } from '../../utils/formatCategories';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Add, Remove, Delete, ArrowBack } from '@mui/icons-material';

const CartPage = () => {
  const { products, changeProductQuantity, removeProductFromCart } =
    useCartActions();
  const navigate = useNavigate();

  const totalAmount = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalProducts = products.reduce((acc, item) => acc + item.quantity, 0);

  const handleUpdateProductQuantity = (
    product: ProductCart,
    amount: number
  ) => {
    changeProductQuantity(product.id, amount);
  };

  const handleDeleteProductFromCartClick = (product: ProductCart) => {
    removeProductFromCart(product);
  };

  return (
    <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 3, fontWeight: 'bold' }}
      >
        Back to Products
      </Button>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Shooping Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Left Section: Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          {products.length === 0 ? (
            <Typography>No products in the cart.</Typography>
          ) : (
            products.map((prod: ProductCart) => (
              <Card
                key={prod.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  boxShadow: 1,
                }}
              >
                {/* Product Image */}
                <CardMedia
                  component="img"
                  image={prod.thumbnail}
                  alt={prod.title}
                  sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2 }}
                />

                {/* Product Details */}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{prod.title}</Typography>

                  {/* Price & Discount */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {prod.discountPercentage > 0 && (
                      <Typography
                        variant="body2"
                        sx={{ color: 'green', fontWeight: 'bold', mr: 1 }}
                      >
                        -{prod.discountPercentage}%{' '}
                        <s style={{ color: 'gray' }}>
                          $
                          {(
                            prod.price /
                            (1 - prod.discountPercentage / 100)
                          ).toFixed(2)}
                        </s>
                      </Typography>
                    )}
                    <Typography variant="h6" fontWeight="bold">
                      {formatPrice(prod.price)}
                    </Typography>
                  </Box>

                  {/* Quantity Selector */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => handleUpdateProductQuantity(prod, -1)}
                      disabled={prod.quantity <= 1}
                      size="small"
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{prod.quantity}</Typography>
                    <IconButton
                      onClick={() => handleUpdateProductQuantity(prod, 1)}
                      size="small"
                    >
                      <Add />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      +50 available
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                    <Button
                      startIcon={<Delete />}
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteProductFromCartClick(prod)}
                    >
                      Delete
                    </Button>
                    <Button variant="text" color="primary">
                      Save
                    </Button>
                    <Button variant="text" color="secondary">
                      Buy Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>

        {/* Right Section: Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Order Summary
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
              }}
            >
              <Typography>Products ({totalProducts})</Typography>
              <Typography fontWeight="bold">
                {formatPrice(totalAmount)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <Typography>Shipping ({totalProducts})</Typography>
              <Typography color="green">Free</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Total Price */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" fontWeight="bold">
                {formatPrice(totalAmount)}
              </Typography>
            </Box>

            <Button fullWidth variant="contained" color="primary">
              Checkout Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;
