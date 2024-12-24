// @ts-ignore
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
      <div className="flex">
        <div className="w-1/2  sm:w-[200px]">
          <CategorySelectorComponent categories={categories} />
        </div>
        <div className="w-1/2 ml-12 mt-2 pt-1">
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
