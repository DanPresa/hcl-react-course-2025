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
    (product: Product) => {
      dispatch(addProductToCart(product));
    },
    [dispatch]
  );

  const changeProductQuantity = useCallback(
    (productId: number, amount: number) => {
      dispatch(updateProductQuantity(productId, amount));
    },
    [dispatch]
  );

  const removeProductFromCart = useCallback(
    (product: ProductCart) => {
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
