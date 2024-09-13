"use client";

import { useState, useEffect } from "react";

export default function Search({ onSearch, categories, debounceDelay = 300 }) {
    const [searchVal, setSearchVal] = useState("");
    const [selectedCategory, setSelectedCategory] = useState('');

    // Debounce logic for the search input and category change
    useEffect(() => {
        const handler = setTimeout(() => {
            // Send both searchValue and selectedCategory to the parent
            onSearch({ searchVal, selectedCategory });
        }, debounceDelay);

        return () => {
            clearTimeout(handler);
        };
    }, [searchVal, selectedCategory, debounceDelay, onSearch]);

    function handleInputChange(e) {
        setSearchVal(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="w-full flex justify-center items-center gap-x-3">
            <input
                type="search"
                value={searchVal}
                onInput={handleInputChange}
                placeholder="Search..."
                className="appearance-none rounded-md relative block w-2/3
                                        px-3 py-2 placeholder-gray-500 text-gray-900 
                                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                                        sm:text-sm border border-gray-300"
            />

            <select value={selectedCategory} onChange={handleCategoryChange}
                className="bg-slate-950 text-white font-semibold py-2 px-3 rounded-md">
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    )
}
