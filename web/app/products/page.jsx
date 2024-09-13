import ProductList from "@/app/products/components/ProductList"
import SearchForm from "@/components/SearchForm";

export const metadata = {
  title: "Products list",
  description: "List all the available products",
};

export default function ProductsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center">Products list</h1>
      <hr />
      <ProductList />
    </section>
  )
}
