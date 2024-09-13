"use client";

import { useState, useEffect } from "react";

export default function SearchForm({ onSearch }) {
    const [searchVal, setSearchVal] = useState("");
    const [debouncedVal, setDebouncedVal] = useState(searchVal);

    // Debouncing logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedVal(searchVal);  // Update debounced value after the timeout
        }, 300);  // 300ms delay for debouncing

        // Cleanup the timeout if the user types within 300ms
        return () => {
            clearTimeout(handler);
        };
    }, [searchVal]);  // Trigger effect whenever searchVal changes

    // Update parent component with the debounced value
    useEffect(() => {
        onSearch(debouncedVal);  // Trigger search on debounced value change
    }, [debouncedVal, onSearch]);  // onSearch is a prop passed from the parent

    function handleInputChange(e) {
        e.preventDefault();
        setSearchVal(e.currentTarget.value);
    }

    return (
        <div className="w-full flex justify-center items-center">
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
        </div>
    )
}
