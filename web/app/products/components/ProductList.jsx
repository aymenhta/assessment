'use client';

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import PaginationComponent from "@/components/PaginationComponent";
import ProductCard from "./ProductCard";
import Link from "next/link";
export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading


    const fetchData = async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
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
            <div className="flex gap-y-3 flex-col items-start justify-start md:gap-y-0 md:flex-row md:justify-between md:items-center">
                <Link className="btn btn__primary" href="/products/create">Add a product</Link>
                <Search onSearch={handleSearch} categories={categories} />
            </div>

            {loading ? (
                <p className="text-center text-slate-600 mt-5">loading...</p>
            ) : (
                <PaginationComponent data={filteredProducts} itemsPerPage={6} IterationComponent={ProductCard} />
            )}

        </>
    )
}

