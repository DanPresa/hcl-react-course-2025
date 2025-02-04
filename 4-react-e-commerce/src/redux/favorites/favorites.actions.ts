import { AppDispatch, RootState } from '../store';
import { favoritesSelector, setFavorites } from './favorites.slice';

export const addToFavorites =
  (product: Product) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { favorites } = favoritesSelector(getState());

    // Check if product already exists in favorites
    const isFavorite = favorites.some(
      (prod: Product) => prod.id === product.id
    );

    // Toggle logic: Remove if exists, add if not
    const newFavorites = isFavorite
      ? favorites.filter((prod: Product) => prod.id !== product.id) // Remove from favorites
      : [...favorites, product]; // Add to favorites

    dispatch(setFavorites(newFavorites));
  };

export const removeProduct =
  (product: Product) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { favorites } = favoritesSelector(getState());

    const newFavorites = favorites.filter(
      (prod: Product) => prod.id !== product.id
    );

    dispatch(setFavorites(newFavorites));
  };
