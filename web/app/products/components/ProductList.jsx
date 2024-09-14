'use client';

import { useEffect, useState } from "react";
import Search from "@/components/Search";
import PaginationComponent from "@/components/PaginationComponent";
import ProductCard from "./ProductCard";
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
            <PaginationComponent data={filteredProducts} itemsPerPage={6} IterationComponent={ProductCard} />
        </>
    )
}

