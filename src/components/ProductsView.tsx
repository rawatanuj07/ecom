import { Category, Product } from "../../sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";
import ProductFilter from "./ui/product-filter";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      {/*categories*/}
      <div className="flex sm:flex flex-col w-full">
        <div className="w-full mt-4 sm:w-[200px]">
          <CategorySelectorComponent categories={categories} />
        </div>
        <div className="w-full mt-2 sm:mt-0 md:ml-12">
          <ProductFilter />
        </div>
      </div>
      {/*products*/}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
