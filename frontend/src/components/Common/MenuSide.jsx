import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GrClose, GrMenu } from 'react-icons/gr';

const MenuSide = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="relative z-50">
                <button
                    onClick={toggleMenu}
                    className="flex items-center gap-2.5 cursor-pointer"
                    aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                >
                    {isMenuOpen ? (
                        <GrClose className="text-[20px]" />
                    ) : (
                        <GrMenu className="text-[20px]" />
                    )}
                    <div className="overflow-hidden h-[20px] relative">
                        <div className={`flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? '-translate-y-[20px]' : 'translate-y-0'}`}>
                            <span className="text-[14px] font-normal h-[20px] flex items-center justify-center">Menu</span>
                            <span className="text-[14px] font-normal h-[20px] flex items-center justify-center">Đóng</span>
                        </div>
                    </div>
                </button>
            </div>

            {/* Nền tối */}
            <div
                className={`fixed inset-0 w-screen h-full bg-black/75 z-30 transition-[opacity,visibility] duration-200 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onClick={closeMenu}
            />

            {/* Menu chính */}
            <div
                className={`fixed top-0 left-0 w-[300px] h-screen bg-white shadow-lg z-40 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col gap-4 mt-[88px]">
                    <Link to="/do-nam" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4 pl-[50px]" onClick={closeMenu}>Đồ Nam</Link>
                    <Link to="/do-nu" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4 pl-[50px]" onClick={closeMenu}>Đồ Nữ</Link>
                    <Link to="/tre-em" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4 pl-[50px]" onClick={closeMenu}>Đồ Trẻ em</Link>
                    <Link to="/tre-so-sinh" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4 pl-[50px]" onClick={closeMenu}>Đồ Trẻ sơ sinh</Link>
                </div>
            </div>
        </>
    );
};

export default MenuSide;
