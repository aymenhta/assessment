'use client';

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Search from "@/components/Search";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);


    const fetchData = async () => {
        try {
            let res = await fetch("https://fakestoreapi.com/products", {
                signal: AbortSignal.timeout(6000), // 6 seconds timeout
            });

            const products = await res.json();
            setProducts(products);
            setFilteredProducts(products);

            res = await fetch("https://fakestoreapi.com/products/categories", {
                signal: AbortSignal.timeout(6000), // 6 seconds timeout
            });
            const categories = await res.json();
            setCategories(categories);

        } catch (error) {
            console.log(error);
        }
    }

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Handle search and category change from the SearchComponent
    function handleSearch({ searchVal, selectedCategory }) {
        let filtered = products;


        // Filter by search query
        if (searchVal) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchVal.toLowerCase())
            );
        }

        // Filter by selected category
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        setFilteredProducts(filtered); // Set filtered products
    };

    return (
        <>
            <Search onSearch={handleSearch} categories={categories} />

            {filteredProducts && filteredProducts.length > 0
                ? (
                    <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 mt-5">
                        {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                )
                :
                <p className="text-center text-slate-600 mt-5">There are no products at the moment :/</p>}
        </>
    )
}

