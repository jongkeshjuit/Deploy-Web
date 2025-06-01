import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../Common/ScrollToTop'

const UserLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow pt-[88px]">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default UserLayout