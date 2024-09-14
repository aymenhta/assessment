import Image from "next/image";
import Link from "next/link";

import getProduct from "@/lib/helpers";

export async function generateMetadata({ params }) {
    const product = await getProduct(params.id, true);

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
    const product = await getProduct(params.id, true);

    return (
        <div>
            <Link href="/products" className="hover:underline">&lt;&lt; Back to list</Link>
            <section className="flex gap-y-3 flex-col items-start justify-start my-10
                                md:gap-y-0 md:gap-x-8 md:flex-row md:justify-between md:items-center">
                <div className="flex items-center justify-center w-full">
                    <Image className="rounded-md shadow" src={product.image} width={200} height={200} alt="product image" />
                </div>
                <div className="mt-10 md:mt-0">
                    <div>
                        <h1 className="text-4xl font-semibold mb-1">{product.title}</h1>
                        <div className="flex justify-start items-center gap-x-6 font-medium mb-2">
                            <p>Price: <span className="text-indigo-600">{product.price}$</span></p>
                            <p>Category: <span className="text-indigo-600">{product.category}</span></p>
                        </div>
                        <p className="text-gray-700 text-lg my-3">{product.description}</p>
                    </div>
                    <div className="flex justify-start items-center gap-x-3">
                        <Link href={`/products/${product.id}/edit`} className="btn btn__primary">Edit</Link>
                        <Link href={`/products/${product.id}/delete`} className="btn btn__secondary">Delete</Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
