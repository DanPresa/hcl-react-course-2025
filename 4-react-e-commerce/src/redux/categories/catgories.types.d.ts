interface Category {
  slug: string;
  name: string;
}

interface CategoriesState {
  loading: boolean;
  categories: Category[];
  selectedCategory: string;
  error: string | null;
}
