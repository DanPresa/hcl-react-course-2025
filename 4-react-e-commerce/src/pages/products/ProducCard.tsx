import { FC } from 'react';
import { useNavigate } from 'react-router';
import useFavoritesActions from '../../redux/favorites/useFavoritesActions';
import useCartActions from '../../redux/cart/useCartActions';
import { formatPrice, formatTitle } from '../../utils/formatCategories';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Rating,
} from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

// Product Interface
interface ProductProps {
  product: Product;
}

// Reusable Product Card Component
const ProductCard: FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const { favorites, addProductToFavorite } = useFavoritesActions();
  const { addProduct } = useCartActions();

  const isfavorite = favorites.some((prod: Product) => prod.id === product.id);

  const handleAddToFavoritesClick = () => {
    addProductToFavorite(product);
  };

  const handleProductDetailsClick = () => {
    const productTitle = formatTitle(product.title);

    navigate(`/product-details/${product.id}/${productTitle}`);
  };

  const handleAddToCartClick = () => {
    addProduct(product);
  };

  return (
    <Card
      sx={{
        p: 2,
        boxShadow: 1,
        borderRadius: 2,
        position: 'relative',
        '&:hover': { boxShadow: 3 },
      }}
    >
      {/* Wishlist Icon */}
      <IconButton
        sx={{ position: 'absolute', top: 10, right: 10 }}
        onClick={handleAddToFavoritesClick}
      >
        {isfavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      {/* Product Image */}
      <CardMedia
        component="img"
        height="160"
        image={product.thumbnail}
        alt={product.title}
      />

      <CardContent sx={{ textAlign: 'left' }}>
        {/* Product Name */}
        {/* <Typography variant="h6" fontWeight="bold">
          {product.title}
        </Typography> */}

        {/* Description */}
        <Typography variant="body2" color="text.secondary">
          {product.description.slice(0, 100)}...{' '}
          <Typography
            component="span"
            variant="body2"
            color="primary"
            sx={{ cursor: 'pointer' }}
            onClick={handleProductDetailsClick}
          >
            Read More
          </Typography>
        </Typography>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
            ${product.discountPercentage.toFixed(2)}
          </Typography>
          {product.price && (
            <Typography
              variant="body2"
              sx={{ textDecoration: 'line-through', color: 'gray' }}
            >
              {formatPrice(product.price)}
            </Typography>
          )}
        </Box>

        {/* Rating */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{ mt: 1 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {product.reviews.length} reviews
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Brand: {product.brand ?? 'N/A'}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Category: {product.category}
          </Typography>
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="outlined"
          sx={{ mt: 2, borderRadius: 30 }}
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
