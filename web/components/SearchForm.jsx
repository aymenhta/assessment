"use client";

import { useState } from "react";

export default function SearchForm({ onSearch }) {
    const [searchVal, setSearchVal] = useState("");

    // TODO: add debounce functionality
    function handleInput(e) {
        e.preventDefault();
        setSearchVal(e.currentTarget.value);
        onSearch(e.currentTarget.value);
    }

    return (
        <form>
            <input type="search" value={searchVal} onInput={handleInput} />
        </form>
    )
}
