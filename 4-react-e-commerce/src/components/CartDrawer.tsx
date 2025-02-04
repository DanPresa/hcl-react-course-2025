import { useNavigate } from 'react-router';
import useCartActions from '../redux/cart/useCartActions';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { ShoppingBag, Close, Add, Remove } from '@mui/icons-material';
import { formatPrice } from '../utils/formatCategories';

const CartDrawer = () => {
  const {
    products,
    openDrawer,
    changeProductQuantity,
    removeProductFromCart,
    toggleDrawer,
  } = useCartActions();
  const navigate = useNavigate();

  const totalAmount = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleUpdateProductQuantityClick = (
    product: Product,
    amount: number
  ) => {
    changeProductQuantity(product, amount);
  };

  const handleRemoveProductClick = (product: Product) => {
    removeProductFromCart(product);
  };

  const handleGoToCartClick = () => {
    navigate('/cart');
    toggleDrawer();
  };

  return (
    <>
      {/* Cart Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        <Box sx={{ width: 350, p: 2 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6">
              <ShoppingBag /> {products.length} item
              {products.length !== 1 ? 's' : ''}
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <Close />
            </IconButton>
          </Box>

          {/* Cart Items */}
          <List>
            {products.length === 0 ? (
              <Typography sx={{ textAlign: 'center', mt: 2 }}>
                Your cart is empty.
              </Typography>
            ) : (
              products.map((prod) => (
                <ListItem
                  key={prod.id}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={prod.thumbnail}
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={prod.title}
                    secondary={`${formatPrice(prod.price)} x ${prod.quantity}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => changeProductQuantity(prod, -1)}
                      disabled={prod.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{prod.quantity}</Typography>
                    <IconButton
                      onClick={() => handleUpdateProductQuantityClick(prod, 1)}
                    >
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveProductClick(prod)}>
                      <Close />
                    </IconButton>
                  </Box>
                </ListItem>
              ))
            )}
          </List>

          {/* Footer */}
          {products.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                Total: {formatPrice(totalAmount)}
              </Typography>
              <Button fullWidth variant="contained" color="error">
                Checkout Now {formatPrice(totalAmount)}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={handleGoToCartClick}
              >
                View Cart
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default CartDrawer;
