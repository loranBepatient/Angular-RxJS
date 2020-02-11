import { ProductCategory } from "../product-categories/product-category";

/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  category: ProductCategory["name"];
  quantityInStock?: number;
  searchKey?: string[];
  supplierIds?: number[];
}
