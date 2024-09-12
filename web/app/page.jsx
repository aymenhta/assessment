import ProductList from "@/app/products/ProductList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/products">Products</Link>
    </div>
  );
}
