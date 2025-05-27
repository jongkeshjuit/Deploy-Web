import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Newsletter = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Implement newsletter subscription
        toast.success('Cảm ơn bạn đã đăng ký!')
        setEmail('')
    }

    return (
        <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Đăng Ký Nhận Tin</h3>
            <p className="text-gray-600 mb-6">
                Nhận thông tin về bộ sưu tập mới và ưu đãi đặc biệt
            </p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                        required
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                    >
                        Đăng Ký
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Newsletter 