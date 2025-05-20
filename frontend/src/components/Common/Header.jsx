import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return (
        <header className='fixed top-0 left-0 w-full z-50 bg-white border-b border-b-[#DCDCDC]'>
            {/* navbar */}
            <Navbar />
            {/* Cart Drawer */}
        </header>
    )
}

export default Header