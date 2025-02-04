import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { categoriesSelector } from './categories.slice';
import { getCategories, selectCategory } from './categories.actions';

const useCategoryActions = () => {
  const dispatch = useAppDispatch();
  const { loading, categories, selectedCategory, error } =
    useAppSelector(categoriesSelector);

  const fetchCategories = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const changeCategory = useCallback(
    (category: string) => {
      dispatch(selectCategory(category));
    },
    [dispatch]
  );

  return {
    loading,
    categories,
    selectedCategory,
    error,
    fetchCategories,
    changeCategory,
  };
};

export default useCategoryActions;
