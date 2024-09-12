import Image from "next/image";
import Link from "next/link";

// TODO: generate dynamic metadata

async function getProduct(id) {
    try {
        let res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            signal: AbortSignal.timeout(10000),
            next: {
                revalidate: 20
            }
        })

        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export default async function ProductDetails({ params }) {
    const product = await getProduct(params.id);
  
    return (
        <>
        <Link href="/products">Back to list</Link>
        <section>
            <Image src={product.image} width={150} height={150} alt="product image" />
            <h1 className="text-xl font-semibold block">{product.title}</h1>
            <span>price: {product.price}$</span>
            <span>category: {product.category}</span>
            <p>{product.description}</p>
        </section>
        </>
  )
}
