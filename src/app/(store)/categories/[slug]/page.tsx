import ProductsView from "@/components/ProductsView";

import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductsByCategory";

async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { params } = props; // Destructure params from props
  const { slug } = await params; // Resolve the promise to extract slug

  const products = await getProductByCategory(slug);
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className=" bg-white p-8 rounded-lg shadow-md w-full max-w-4x1">
        <h1 className="bg-gradient-to-r from-red-600 to-black text-3xl font-bold mb-6 text-center">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
export default CategoryPage;
