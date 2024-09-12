import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <>
            <Image src={product.image} width={30} height={30} alt="product image" />
            <Link href={`/products/${product.id}`} className="text-xl font-semibold block">{product.title}</Link>
            <span>price: {product.price}$</span>
            <span>category: {product.category}</span>
            <p>{product.description.slice(0, 150)}...</p>
        </>
    )
}
