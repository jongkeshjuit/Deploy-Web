import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GrMenu, GrSearch, GrCart, GrClose } from "react-icons/gr"
import { IoMdHeartEmpty } from "react-icons/io"
import MenuSide from './MenuSide' // Đường dẫn chính xác

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isMenuOpen])

    return (
        <>
            <nav className="flex items-center justify-between h-[80px] border-b border-[#DCDCDC] px-[50px]">
                {/* Menu + Search */}
                <div className='flex items-center gap-[20px]'>
                    {/* Nút menu */}
                    <div className="relative z-50">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2.5 cursor-pointer"
                            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
                        >
                            {isMenuOpen ? (
                                <GrClose className="text-[20px]" />
                            ) : (
                                <GrMenu className="text-[20px]" />
                            )}
                            <div className="overflow-hidden h-[22px] relative">
                                <div className={`flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? '-translate-y-[20px]' : 'translate-y-0'}`}>
                                    <span className="text-[14px] font-normal h-[20px]">Menu</span>
                                    <span className="text-[14px] font-normal h-[20px]">Đóng</span>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Tìm kiếm */}
                    <button className='flex items-center gap-2.5 cursor-pointer' aria-label="Tìm kiếm">
                        <GrSearch className='text-[20px]' />
                        <span className='text-[14px] font-normal'>Tìm kiếm</span>
                    </button>
                </div>

                {/* Logo */}
                <div>
                    <Link to="/" className="text-[30px] font-medium font-Jost">Wukudada.</Link>
                </div>

                {/* Liên hệ + yêu thích + giỏ hàng */}
                <div className='flex items-center gap-[20px]'>
                    <button className='flex items-center gap-2.5 cursor-pointer'>
                        <span className='text-[14px] font-normal'>Liên hệ với chúng tôi</span>
                    </button>
                    <button className='flex items-center gap-2.5 cursor-pointer'>
                        <IoMdHeartEmpty className='text-[20px]' />
                    </button>
                    <button className='flex items-center gap-2.5 cursor-pointer'>
                        <GrCart className='text-[20px]' />
                    </button>
                </div>
            </nav>

            {/* MenuSide gọi ra ở đây */}
            <MenuSide isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    )
}

export default Navbar
