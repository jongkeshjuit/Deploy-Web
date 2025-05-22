import React from 'react'
import { Link } from 'react-router-dom'
const CollectionSection = ({ sex,title, mediaUrl, mediaType = 'image', items = [], link }) => {
    return (
        <div className="flex flex-col justify-center gap-6 mt-6">
            <Link to={link}>
                <div className="w-full h-[400px] md:h-[600px] lg:h-[750px]">
                    {mediaType === 'video' ? (
                        <video
                            src={mediaUrl}
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover" />
                    ) : (
                        <img
                            src={mediaUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </Link>
            <div className="container mx-auto px-7 sm:px-4 md:px-6 lg:px-32">
                <p className="text-center text-sm font-normal mb-3">
                    {sex === 'Men' ? 'DÀNH CHO NAM' : 'DÀNH CHO NỮ'}
                </p>
                <h2 className="text-center text-2xl md:text-3xl font-normal mb-6">{title}</h2>
                
                {/* <div className="flex justify-center w-full"> */}
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                        {items.map((item, index) => (
                            <li key={index} className="w-full">
                                <div className="relative w-full aspect-[3/4] overflow-hidden group">
                                    <img
                                        src={item.image}
                                        alt={item.title || `Item ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {item.title && (
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                                                {item.title}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                {/* </div> */}
            </div>
            <Link to={link}>
                <div className="flex justify-center mt-4">
                    <button className="cursor-pointer px-8 py-2 border border-black rounded-full transition duration-300 hover:shadow-[inset_0_0_0_1px_black]">
                        Xem thêm
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default CollectionSection