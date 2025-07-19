import { ProductType } from "@/types/ProductType";
import Product from "./components/Product";
import { ClerkProvider } from "@clerk/nextjs";
import Stripe from "stripe";

async function getProducts(): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil'
  });
  
  const products = await stripe.products.list();
  
  const formattedProducts = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
      });
      
      if (!prices.data.length) {
        throw new Error(`No prices found for product ${product.id}`);
      }
      
      const price = prices.data[0];
      
      return {
        id: product.id,
        price: price.unit_amount, // This is in cents/pence (smallest currency unit)
        name: product.name,
        image: product.images[0] || null, // Handle case where images array might be empty
        description: product.description || null, // Handle optional description
        currency: price.currency,
      };
    })
  );
  
  return formattedProducts;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <ClerkProvider>
      <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
          {products.map((product) => (
            <Product key={product.id} product={product}></Product>
          ))}
        </div>
      </div>
    </ClerkProvider>
  );
}