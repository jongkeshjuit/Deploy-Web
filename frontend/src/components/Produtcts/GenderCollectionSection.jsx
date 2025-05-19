import React from 'react'

const GenderCollectionSection = () => {
    return (
        <section className='py-16'>
            <div>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-4xl font-menium tracking-wider'>Khám phá bộ sưu tập của Wukudada.</h2>
                </div>
                <div className='flex flex-wrap justify-center gap-[20px] mt-[25px]'>
                    <img src="https://images6.alphacoders.com/134/thumb-1920-1342229.png" alt=""
                        className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-5'>
                        <div className='bg-amber-100 w-[150px] h-[200px] md:h-[200px] lg:h-[400px] lg:w-[300px]'></div>
                        <div className='bg-amber-100 w-[150px] h-[200px] md:h-[200px] lg:h-[400px] lg:w-[300px]'></div>
                        <div className='bg-amber-100 w-[150px] h-[200px] md:h-[200px] lg:h-[400px] lg:w-[300px]'></div>
                        <div className='bg-amber-100 w-[150px] h-[200px] md:h-[200px] lg:h-[400px] lg:w-[300px]'></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GenderCollectionSection