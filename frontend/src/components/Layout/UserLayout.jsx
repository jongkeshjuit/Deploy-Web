import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from '../Common/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css'

const UserLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow pt-[88px]">
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Toast Notifications */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default UserLayout