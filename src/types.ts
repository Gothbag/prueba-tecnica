export type Product = 'color' | 'insider' | 'both';

export interface ProductOption {
  name: Product;
  quantity: number;
  duration: 'monthly' | 'yearly';
}
