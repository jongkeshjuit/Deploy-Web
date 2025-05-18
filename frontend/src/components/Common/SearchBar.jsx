import React, { useState } from 'react';
import { GrSearch, GrClose } from 'react-icons/gr';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleSearch = () => setIsOpen((prev) => !prev);
    const clearSearch = () => setSearchTerm('');
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', searchTerm);
        setIsOpen(false);
    }

    return (
        <>
            {/* Nút mở tìm kiếm luôn hiển thị */}
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

            {/* Giao diện tìm kiếm trượt xuống */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transition-transform duration-200 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <form className="relative flex flex-col items-center w-full h-full pt-10"
                onSubmit={handleSearch}>
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
                </form>
            </div>
        </>
    );
};

export default SearchBar;
