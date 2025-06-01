import React, { useState } from 'react'
import { toast } from 'sonner'

const Newsletter = () => {
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        if (!email) {
            setErrors({ email: "Vui lòng nhập email" });
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors({ email: "Email không hợp lệ" });
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            toast.success('Cảm ơn bạn đã đăng ký!')
            setEmail('')
        }
    }

    return (
        <div className='flex flex-col gap-[15px] flex-1'>
            <h3 className='font-semibold'>Đăng Ký Nhận Tin</h3>
            <form onSubmit={handleSubmit} className="max-w-md">
                <div className="flex gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        className="flex-1 px-2 py-2 text-[14px] border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 text-[14px] bg-black text-white hover:bg-gray-800 transition duration-300"
                    >
                        Đăng Ký
                    </button>
                </div>
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </form>
        </div>
    )
}

export default Newsletter 