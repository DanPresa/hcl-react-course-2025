import { FC, memo } from 'react';

interface CartitemProps {
  item: {
    name: string;
  };
}

const Cartitem: FC<CartitemProps> = memo(({ item }) => {
  console.log('Cartitem component rendered');
  return <li>{item.name}</li>;
});

export default Cartitem;
