import { formatCategories } from '../../utils/formatCategories';
import axiosInstance from '../../config/api/axiosInstance';
import { AppDispatch } from '../store';
import {
  setCategories,
  setError,
  setLoading,
  setSelectedCategory,
} from './categories.slice';

export const getCategories = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axiosInstance.get('/products/category-list');

    const formatCategoriesData = formatCategories(data);

    dispatch(setCategories(formatCategoriesData));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setError(error.message));
    } else {
      dispatch(setError('An unknown error occurred'));
    }
  }
};

export const selectCategory = (category: string) => (dispatch: AppDispatch) => {
  dispatch(setSelectedCategory(category));
};
