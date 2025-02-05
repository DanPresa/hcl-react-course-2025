import axiosInstance from '../../config/api/axiosInstance';
import { AppDispatch } from '../store';
import {
  setError,
  setLoading,
  setProduct,
  setProducts,
} from './products.slice';

export const getAllProducts = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const { data } = await axiosInstance.get<ProductData>('/products');

    dispatch(setProducts(data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError('An unknown error occurred'));
    }
  }
};

export const getProductsByCategory =
  (category: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      const { data } = await axiosInstance.get<ProductData>(
        `/products/category/${category}`
      );

      dispatch(setProducts(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

export const getProductById =
  (productId: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading());

    try {
      const { data } = await axiosInstance.get<Product>(
        `/products/${productId}`
      );

      dispatch(setProduct(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };
