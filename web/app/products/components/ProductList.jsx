'use client';

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


export default function ProductList() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            try {
                let res = await fetch('https://fakestoreapi.com/products', {
                    signal: AbortSignal.timeout(6000), // 6 seconds timeout
                })

                setProducts(await res.json())
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 mt-5">
            {products && products.length > 0
                ? (
                    products.map((p) => <ProductCard key={p.id} product={p} />)
                )
                :
                <p>There are no products at the moment :/</p>}
        </div>
    )
}

