import ProductsView from "@/components/ProductsView";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

import { UserIcon } from "@sanity/icons";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <>
      <h1>Helllo 1234</h1>
      <UserIcon />
      <Button>click-me</Button>
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </>
  );
}
