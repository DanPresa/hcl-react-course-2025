interface Category {
  slug: string; // mens-shoes
  name: string; // Mens Shoes
}

interface CategoriesState {
  loading: boolean;
  categories: Category[];
  selectedCategory: string;
  error: string | null;
}
