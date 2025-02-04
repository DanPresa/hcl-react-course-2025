interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

interface Review {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
  quantity: number;
}

interface ProductData {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

type ProductWithTotal = Omit<ProductData, 'products'>;

interface ProductsState extends ProductWithTotal {
  loading: boolean;
  products: Product[];
  product: Product | null;
  error: string | null;
}
