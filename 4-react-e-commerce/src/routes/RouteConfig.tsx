import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import ProductPage from '../pages/products';
import ProductDetails from '../pages/products/ProductDetails';
import FavoritesPage from '../pages/favorites';
import CartPage from '../pages/cart';

const RouteConfig = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<ProductPage />} />
        <Route
          path="/product-details/:productId/:productTitle"
          element={<ProductDetails />}
        />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
};

export default RouteConfig;
