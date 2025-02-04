import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { productsSelector } from './products.slice';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from './products.actions';

const useProductsActions = () => {
  const dispatch = useAppDispatch();
  const { loading, products, product, error } =
    useAppSelector(productsSelector);

  const fetchAllProducts = useCallback(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const fetchProductsByCategory = useCallback(
    (slug: string) => {
      dispatch(getProductsByCategory(slug));
    },
    [dispatch]
  );

  const fetchProductById = useCallback(
    (productId: string) => {
      dispatch(getProductById(productId));
    },
    [dispatch]
  );

  return {
    loading,
    products,
    product,
    error,
    fetchAllProducts,
    fetchProductsByCategory,
    fetchProductById,
  };
};

export default useProductsActions;
