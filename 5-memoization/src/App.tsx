import { useCallback, useMemo, useState } from 'react';
import Productitem from './components/Productitem';
import Cartitem from './components/Cartitem';

interface Product {
  id: number;
  name: string;
  category: string;
}

type CartItem = Omit<Product, 'category'>;

const App = () => {
  console.log('App component rendered');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [counter, setCounter] = useState(0);

  const products: Product[] = useMemo(
    () => [
      { id: 1, name: 'Laptop', category: 'Electronics' },
      { id: 2, name: 'T-shirt', category: 'Clothing' },
      { id: 3, name: 'Phone', category: 'Electronics' },
      { id: 4, name: 'Shoes', category: 'Clothing' },
      { id: 5, name: 'Headphones', category: 'Electronics' },
      { id: 6, name: 'Jacket', category: 'Clothing' },
      { id: 7, name: 'Tablet', category: 'Electronics' },
      { id: 8, name: 'Jeans', category: 'Clothing' },
      { id: 9, name: 'Monitor', category: 'Electronics' },
      { id: 10, name: 'Sweater', category: 'Clothing' },
      { id: 11, name: 'Keyboard', category: 'Electronics' },
      { id: 12, name: 'Hat', category: 'Clothing' },
      { id: 13, name: 'Mouse', category: 'Electronics' },
      { id: 14, name: 'Scarf', category: 'Clothing' },
      { id: 15, name: 'Smartwatch', category: 'Electronics' },
      { id: 16, name: 'Socks', category: 'Clothing' },
      { id: 17, name: 'Camera', category: 'Electronics' },
      { id: 18, name: 'Gloves', category: 'Clothing' },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    console.log('Filtering products..');

    return category ? products.filter((product) => product.category === category) : products;
  }, [category, products]);

  const addTocart = useCallback((product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }, []);

  return (
    <>
      <h2>Product List</h2>

      <select value={category} onChange={handleCategoryChange}>
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      <ul>
        {filteredProducts.map((product) => (
          <Productitem key={product.id} product={product} onAddCart={addTocart} />
        ))}
      </ul>

      <h3>Cart ({cart.length}) items</h3>
      <ul>
        {cart.map((item, index) => (
          <Cartitem key={index} item={item} />
        ))}
      </ul>

      <div>
        <h3>Counter: {counter}</h3>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
      </div>
    </>
  );
};

export default App;
