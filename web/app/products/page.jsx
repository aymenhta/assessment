import ProductList from "@/app/products/components/ProductList"
import { getProducts } from "@/lib/helpers";

export const metadata = {
  title: "Products list",
  description: "List all the available products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mb-5">Products list</h1>
      <ProductList products={products} />
    </section>
  )
}
