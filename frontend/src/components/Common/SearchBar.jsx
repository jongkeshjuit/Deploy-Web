import React, { useState, useEffect } from 'react';
import { GrSearch, GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { collections } from '../../assets/dummyData';
import ProductGrid from '../Products/ProductGrid';
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const toggleSearch = () => setIsOpen((prev) => !prev);
    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.trim()) {
                const results = collections.flatMap(collection =>
                    collection.products.filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
                setSearchResults(results);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    return (
        <>
            {!isOpen && (
                <button
                    onClick={toggleSearch}
                    className="flex items-center gap-2.5 cursor-pointer z-10 relative"
                    aria-label="Mở tìm kiếm"
                >
                    <GrSearch className="text-[20px]" />
                    <span className="text-sm">Tìm kiếm</span>
                </button>
            )}

            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transition-transform duration-200 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <div className="relative flex flex-col items-center w-full h-full pt-10 overflow-y-auto">
                    <button
                        type="button"
                        onClick={toggleSearch}
                        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                        aria-label="Đóng tìm kiếm"
                    >
                        <GrClose className="text-[16px] text-gray-500" />
                    </button>
                    <div className="relative w-1/2 mt-2">
                        <input
                            type="text"
                            placeholder="Tìm sản phẩm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-100 h-10 px-4 py-2 pl-7 pr-20 rounded-full w-full placeholder:text-gray-700 focus:outline-none"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 rounded-full bg-gray-100 text-gray-500 text-sm font-medium cursor-pointer"
                            >
                                Xóa
                            </button>
                        )}
                    </div>

                    {/* Search Results Grid */}
                    {searchResults.length > 0 && (
                        <div className="w-full h-full mt-8 px-[50px]">
                            <h3 className="text-lg font-semibold mb-4">Kết quả tìm kiếm:</h3>
                            <div className="w-full">
                                <ProductGrid
                                    product={searchResults}
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchBar;
