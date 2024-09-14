import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ item: product }) {
    return (
        <div className="bg-white flex items-center justify-center gap-x-6 border px-3 py-2 rounded-md shadow">
                <Image src={product.image} width={100} height={100} alt="product image" />
            <div className="h-full flex flex-col items-start justify-evenly">
                <p className="text-indigo-600 font-semibold">{product.price}$</p>

                <div>
                    <Link href={`/products/${product.id}`} className="text-lg font-semibold block hover:text-indigo-600 transition">{product.title}</Link>
                    <p className="text-slate-600">{product.category}</p>
                </div>

                <div></div>
            </div>
        </div>
    )
}
