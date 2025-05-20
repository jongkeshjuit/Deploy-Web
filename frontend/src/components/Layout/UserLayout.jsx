import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
    return (
        <>
            {/* Header */}
            <Header />
            {/* Main context */}
            <main className='pt-[88px]'>
                <Outlet />
            </main>
            {/* Footer */}
            <Footer />
        </>
    )
}

export default UserLayout