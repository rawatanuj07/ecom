import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { searchProductsByPrice } from "@/sanity/lib/products/searchProductsByPrice";
import SaleBanner from "@/components/salebanner";

export default async function Home() {
  const products = await getAllProducts();
  console.log("products are", products);
  const categories = await getAllCategories();
  // const productss = await searchProductsByPrice();
  return (
    <>
      <SaleBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </>
  );
}
