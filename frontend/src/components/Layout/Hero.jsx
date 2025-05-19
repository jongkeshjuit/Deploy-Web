import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='relative'>
            <img src="https://images4.alphacoders.com/915/thumb-1920-915356.jpg" alt="zerotwo"
                className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
            <div className='absolute inset-0 bg-black/25 flex items-center justify-center'>
                <div className='text-center text-white p-6'>
                    <h1 className='text-4xl md:text-9xl font-bold tracking-tighter mb-20'>ダーリン<br />おはよう</h1>
                    <p className='text-sm md:text-lg mb-6'>Bộ sưu tập Wukudada</p>
                    <Link to="#" className='bg-white text-black px-6 py-3 rounded-sm text-sm md:text-lg font-semibold hover:bg-gray-200 transition duration-300'>
                        Khám Phá Ngay
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero