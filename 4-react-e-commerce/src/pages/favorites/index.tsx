import { useState } from 'react';
import { useNavigate } from 'react-router';
import useFavoritesActions from '../../redux/favorites/useFavoritesActions';
import useCartActions from '../../redux/cart/useCartActions';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Tab,
  Tabs,
} from '@mui/material';
import { Add, Delete, ArrowBack } from '@mui/icons-material';

const FavoritesPage = () => {
  const { favorites, removeProductFromFavorite } = useFavoritesActions();
  const { addProduct } = useCartActions();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleAddProductToCartClick = (product: Product) => {
    addProduct(product);
  };

  const handleRemoveProductClick = (product: Product) => {
    removeProductFromFavorite(product);
  };

  return (
    <Box sx={{ p: 4, maxWidth: '900px', mx: 'auto' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{ mb: 3, fontWeight: 'bold' }}
      >
        Back to Products
      </Button>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Wish List
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Favorites" />
      </Tabs>

      {/* Render Favorites */}
      {tab === 0 && (
        <>
          {favorites.length === 0 ? (
            <Typography>You have no favorite products.</Typography>
          ) : (
            favorites.map((product) => (
              <Card
                key={product.id}
                sx={{ display: 'flex', mb: 2, p: 2, boxShadow: 1 }}
              >
                {/* Product Image */}
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ width: 120, height: 120, objectFit: 'contain', mr: 2 }}
                />

                {/* Product Details */}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{product.title}</Typography>

                  {/* Price & Discount */}
                  <Typography
                    variant="h5"
                    sx={{ color: 'green', fontWeight: 'bold' }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  {product.discountPercentage > 0 && (
                    <Typography variant="body2" color="error">
                      Before:{' '}
                      <s>
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </s>{' '}
                      - {product.discountPercentage}% OFF
                    </Typography>
                  )}

                  {/* Installments & Shipping */}
                  <Typography variant="body2" color="text.secondary">
                    in 15 months without interest of $
                    {(product.price / 15).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    🚚 Free Shipping
                  </Typography>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                    <Button
                      startIcon={<Add />}
                      variant="text"
                      color="primary"
                      onClick={() => handleAddProductToCartClick(product)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      startIcon={<Delete />}
                      variant="text"
                      color="error"
                      onClick={() => handleRemoveProductClick(product)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </>
      )}

      {/* Render Lists Placeholder */}
      {tab === 1 && (
        <Box>
          <Typography>Saved lists (under development)</Typography>
        </Box>
      )}
    </Box>
  );
};

export default FavoritesPage;
