import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <div className="flex items-center justify-center border px-2">
                <Image src={product.image} width={100} height={100} alt="product image" />
            <div className="ml-8">
                <Link href={`/products/${product.id}`} className="text-lg font-semibold block">{product.title}</Link>
                <p>price: {product.price}$</p>
                <p>category: {product.category}</p>
            </div>
        </div>
    )
}
