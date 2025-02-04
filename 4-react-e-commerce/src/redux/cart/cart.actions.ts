import { AppDispatch, RootState } from '../store';
import { cartSelector, setProducts, setToggleDrawer } from './cart.slice';

export const addProductToCart =
  (product: Product) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { products } = cartSelector(getState());

    const existingProduct = products.find((prod) => prod.id === product.id);

    if (!existingProduct) {
      dispatch(setProducts([...products, { ...product, quantity: 1 }]));
    } else {
      dispatch(updateProductQuantity(product.id, 1));
    }

    dispatch(setToggleDrawer(true));
  };

export const updateProductQuantity =
  (productId: number, amount: number) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { products } = cartSelector(getState());

    const isNegativeAmount = amount < 0 ? -1 : 1;

    const updateProducts = products.map((prod: ProductCart) =>
      prod.id === productId
        ? {
            ...prod,
            quantity: Math.max(prod.quantity + isNegativeAmount, 1),
          }
        : prod
    );

    dispatch(setProducts(updateProducts));
  };

export const removeProduct =
  (productId: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { products } = cartSelector(getState());

    const updatedProducts = products.filter((prod) => prod.id !== productId);

    dispatch(setProducts(updatedProducts));
  };
