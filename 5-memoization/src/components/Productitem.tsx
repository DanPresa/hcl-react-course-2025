import { FC, memo } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
}

interface ProductProps {
  product: Product;
  onAddCart: (product: Product) => void;
}

const Productitem: FC<ProductProps> = memo(({ product, onAddCart }) => {
  console.log('Productitem component rendered');
  return (
    <li key={product.id}>
      {product.name} <button onClick={() => onAddCart(product)}>Add to Cart</button>
    </li>
  );
});

export default Productitem;
