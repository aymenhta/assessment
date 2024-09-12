'use client';

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


export default function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            try {
                let res = await fetch('https://fakestoreapi.com/products', {
                    signal: AbortSignal.timeout(10000),
                    next: {
                        revalidate: 20
                    }
                })

                setProducts(await res.json())
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return (
        <section>
            <h1 className="text-3xl font-bold text-center">Products list</h1>
            <hr />
            <div className="grid grid-cols-3 gap-5">
                {products
                    ? (
                        products.map((p) => (
                            <div key={p.id}>
                                <ProductCard product={p} />
                            </div>
                        ))
                    )
                    :
                    <p>There are no products at the moment :/</p>}
            </div>

        </section>
    )
}

