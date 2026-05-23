export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

export interface CategoryInput {
  name: string;
}

export interface ProductInput {
  name: string;
  price: number;
  categoryId: string;
}

export interface ApiErrorBody {
  message?: string;
}
