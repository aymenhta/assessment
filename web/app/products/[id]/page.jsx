import Image from "next/image";
import Link from "next/link";

import getProduct  from "@/lib/helpers";

export async function generateMetadata({ params }) {
    const product = await getProduct(params.id);

    return {
        title: product.title,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            url: `${process.env.WEBSITE_URL}/products/${params.id}`,
            images: [
                {
                    url: product.image,
                    width: 200,
                    height: 200,
                    alt: product.title,
                },
            ],
        },
    };
}


export default async function ProductDetails({ params }) {
    const product = await getProduct(params.id);

    return (
        <div>
            <Link href="/products">Back to list</Link>
            <section className="flex gap-y-3 flex-col items-start justify-start md:gap-y-0 md:flex-row md:justify-between md:items-center">
                <Image src={product.image} width={200} height={200} alt="product image" />
                <div>
                    <h1 className="text-xl font-semibold block">{product.title}</h1>
                    <span>price: {product.price}$</span>
                    <span>category: {product.category}</span>
                    <p>{product.description}</p>
                </div>
            </section>
            <section className="flex justify-start items-center gap-x-4">
                <Link href={`/products/${product.id}/edit`} className="btn btn__primary">Edit</Link>
                <Link href={`/products/${product.id}/delete`} className="btn btn__secondary">Delete</Link>
            </section>
        </div>
    )
}
