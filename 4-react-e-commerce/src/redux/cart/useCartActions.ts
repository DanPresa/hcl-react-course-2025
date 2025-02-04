import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks';
import { cartSelector, setToggleDrawer } from './cart.slice';
import {
  addProductToCart,
  removeProduct,
  updateProductQuantity,
} from './cart.actions';

const useCartActions = () => {
  const dispatch = useAppDispatch();
  const { products, openDrawer } = useSelector(cartSelector);

  const addProduct = useCallback(
    (product: Product, amount?: number) => {
      dispatch(addProductToCart(product, amount));
    },
    [dispatch]
  );

  const changeProductQuantity = useCallback(
    (product: Product, amount: number) => {
      dispatch(updateProductQuantity(product, amount));
    },
    [dispatch]
  );

  const removeProductFromCart = useCallback(
    (product: Product) => {
      dispatch(removeProduct(product.id));
    },
    [dispatch]
  );

  const toggleDrawer = useCallback(() => {
    dispatch(setToggleDrawer(!openDrawer));
  }, [openDrawer, dispatch]);

  return {
    products,
    openDrawer,
    addProduct,
    changeProductQuantity,
    removeProductFromCart,
    toggleDrawer,
  };
};

export default useCartActions;
