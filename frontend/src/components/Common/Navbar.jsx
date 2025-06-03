import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io"
import { PiShoppingCartSimple } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from 'react-redux';

import MenuSide from './MenuSide'
import SearchBar from './SearchBar';
import { useCart } from '../Cart/CartContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <nav className="relative flex items-center justify-between h-[88px] px-[50px]">
        {/* Menu + Search */}
        <div className="flex items-center gap-[20px]">
          {/* Nút menu */}
          <MenuSide />
          {/* Tìm kiếm */}
          <SearchBar />
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-[30px] font-medium font-Jost">
            Wukudada.
          </Link>
        </div>

        {/* tài khoản + giỏ hàng */}
        <div className="flex items-center gap-[20px]">
          {userInfo ? (
            // Nếu đã đăng nhập, hiển thị link đến profile với avatar và tên
            <Link to="/profile" className="flex items-center gap-[10px]">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
                {userInfo.profileImage ? (
                  <img 
                    src={userInfo.profileImage} 
                    alt={userInfo.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AiOutlineUser className="text-[20px]" />
                )}
              </div>
              <span className="text-sm truncate max-w-[120px]">
                {userInfo.name || 'Tài khoản'}
              </span>
            </Link>
          ) : (
            // Nếu chưa đăng nhập, hiển thị link đến trang đăng nhập
            <Link to="/login" className="flex items-center gap-[10px]">
              <AiOutlineUser className="text-[20px]" />
              <span className="text-sm">Tài khoản</span>
            </Link>
          )}
          
          <Link
            to="/cart"
            className="flex items-center gap-[10px] relative"
          >
            {/* Icon giỏ hàng */}
            <div className="relative">
              <PiShoppingCartSimple className="text-[24px]" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
            <span className="text-sm">Giỏ hàng</span>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar