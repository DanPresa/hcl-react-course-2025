import { combineReducers } from '@reduxjs/toolkit';
import categories from './categories/categories.slice';
import products from './products/products.slice';
import favorites from './favorites/favorites.slice';
import cart from './cart/cart.slice';

const rootReducer = combineReducers({
  categories,
  products,
  favorites,
  cart,
});

export default rootReducer;
