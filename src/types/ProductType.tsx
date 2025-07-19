export type ProductType = {
  id: string;  // Changed from number to string
  price: number | null;
  name: string;
  image: string | null;
  description: string | null;
  currency: string;
};