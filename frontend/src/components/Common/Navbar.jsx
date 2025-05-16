import React from 'react'
import { Link } from 'react-router-dom'
import { GrMenu, GrSearch, GrCart } from "react-icons/gr";
import { IoMdHeartEmpty, IoMdMenu } from "react-icons/io";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between h-[80px] border-b border-[#DCDCDC] px-[50px]">
            <div className='flex items-center gap-[20px]'>
                <button className='flex items-center justify-between gap-2.5'>
                    <GrMenu className='text-[20px]' />
                    <span className='text-[14px] font-normal'>Menu</span>
                </button>
                <button className='flex items-center justify-between gap-2.5'>
                    <GrSearch className='text-[20px]' />
                    <span className='text-[14px] font-normal'>Tìm kiếm</span>
                </button>
            </div>
            {/* logo */}
            <div>
                <Link to="/" className="text-[30px] font-medium font-Jost">
                    WUKUDADA
                </Link>
            </div>

            <div className='flex items-center gap-[20px]'>
                <button className='flex items-center gap-2.5'>
                    <span className='text-[14px] font-normal'>Liên hệ với chúng tôi</span>
                </button>
                <button className='flex items-center gap-2.5'>
                    <IoMdHeartEmpty className='text-[20px]' />
                </button>
                <button className='flex items-center gap-2.5'>
                    <GrCart className='text-[20px]' />
                </button>
            </div>
        </nav>
    )
}

export default Navbar