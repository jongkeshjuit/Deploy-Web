import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='flex flex-col gap-[53px] bg-[#F4F4F4]'>
            <div className='flex items-top justify-between px-[50px] pt-[30px] pb-['>
                {/* bên trái */}
                <div className='flex flex-col gap-[15px] w-[164px]'>
                    <h3 className='font-semibold'>Về Wukudada.</h3>
                    <Link to="information" className='text-[14px] font-light'>Thông tin</Link>
                    <Link to="#" className='text-[14px] font-light'>Chính sách</Link>
                </div>
                {/* ở giữa */}
                <div className='flex flex-col gap-[15px] w-[300px]'>
                    <h3 className='font-semibold'>Liên hệ Wukudada.</h3>
                    <p className='text-[14px] font-light'>Quý khách có thể liên hệ với chúng tôi qua Hotline <a href="tel:+" className='font-normal'>+84 567890111</a>, <a href="mailto:">Email</a>, hoặc các phương thức liên hệ khác.</p>
                    <p className='text-[14px] font-light'><span className='font-medium'>Địa chỉ:</span> 123 Đường ABC, TP. HCM</p>
                </div>
                {/* bên phải */}
                <div className='flex flex-col gap-[15px] w-[164px]'>
                    <h3 className='font-semibold'>Theo dõi Wukudada.</h3>
                    <div className='flex items-center gap-[15px]'>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookSquare className='h-[30px] w-[30px] text-[#757575]' /></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagramSquare className='h-[30px] w-[30px] text-[#757575]' /></a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FaYoutube className='h-[30px] w-[30px] text-[#757575]' /></a>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center border-t-[1px] border-t-[#DCDCDC] py-[10px]'>
                <p className='text-[14px] font-semibold'>Bản quyền thuộc Công ty TNHH Wukudada. Bảo lưu mọi quyền.</p>
            </div>
        </div>
    )
}

export default Footer