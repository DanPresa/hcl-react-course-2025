interface ProductCart extends Product {
  quantity: number;
}

interface CartState {
  products: ProductCart[];
  openDrawer: boolean;
}
