// MenuSide.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const MenuSide = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Nền tối */}
            <div
                className={`fixed inset-0 w-screen h-full bg-black/75 z-30 transition-[opacity,visibility] duration-200 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Menu chính */}
            <div
                className={`fixed top-0 left-0 w-[300px] h-screen bg-white shadow-lg z-40
                    transition-all duration-300 ease-in-out transform
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col gap-4 mt-[80px] pl-[50px]">
                    <Link to="/do-nam" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4" onClick={onClose}>Đồ Nam</Link>
                    <Link to="/do-nu" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4" onClick={onClose}>Đồ Nữ</Link>
                    <Link to="/tre-em" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4" onClick={onClose}>Đồ Trẻ em</Link>
                    <Link to="/tre-so-sinh" className="text-[20px] font-normal transition-all duration-300 hover:underline underline-offset-4" onClick={onClose}>Đồ Trẻ sơ sinh</Link>
                </div>
            </div>
        </>
    );
};

export default MenuSide;
