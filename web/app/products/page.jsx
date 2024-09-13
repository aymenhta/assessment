import ProductList from "@/app/products/components/ProductList"

export const metadata = {
  title: "Products list",
  description: "List all the available products",
};

export default function ProductsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center mb-5">Products list</h1>
      <ProductList />
    </section>
  )
}
