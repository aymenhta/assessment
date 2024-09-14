import ProductCard from '@/app/products/components/ProductCard';
import React, { useState } from 'react';

const PaginationComponent = ({ data, itemsPerPage, IterationComponent }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get the current items for the page
    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // render pagination controls
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div>
            {currentItems && currentItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 mt-5">
                    {currentItems.map(item => (
                        <IterationComponent key={item.id} item={item} />
                    ))}
                </div>
            ) : [
                <p className="text-center text-slate-600 mt-5">There are no products at the moment :/</p>
            ]}


            {/* Pagination Controls */}
            <div className="pagination__controls">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </button>
                )}
                {renderPageNumbers()}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default PaginationComponent;
