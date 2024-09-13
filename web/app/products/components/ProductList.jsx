'use client';

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchForm from "@/components/SearchForm";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchData = async () => {
        try {
            let res = await fetch("https://fakestoreapi.com/products", {
                signal: AbortSignal.timeout(6000), // 6 seconds timeout
            });

            const products = await res.json();
            setProducts(products);
            setFilteredProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Filter data when the user provide filtering data
    function handleSearch(query) {
        // since the fakestoreapi doesn't provide a searching mecanism
        // we have to perform client side filtering
        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    }

    return (
        <>
            <SearchForm onSearch={handleSearch} />

            <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 mt-5">
                {filteredProducts && filteredProducts.length > 0
                    ? (
                        filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
                    )
                    :
                    <p>There are no products at the moment :/</p>}
            </div>
        </>
    )
}

