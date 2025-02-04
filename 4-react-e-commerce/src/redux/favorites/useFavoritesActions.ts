import { useAppDispatch, useAppSelector } from '../hooks';
import { addToFavorites, removeProduct } from './favorites.actions';
import { favoritesSelector } from './favorites.slice';

const useFavoritesActions = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(favoritesSelector);

  const addProductToFavorite = (prod: Product) => {
    dispatch(addToFavorites(prod));
  };

  const removeProductFromFavorite = (prod: Product) => {
    dispatch(removeProduct(prod));
  };

  return {
    favorites,
    addProductToFavorite,
    removeProductFromFavorite,
  };
};

export default useFavoritesActions;
