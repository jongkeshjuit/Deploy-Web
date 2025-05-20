import React from 'react'
const CollectionSection = ({ title, imageUrl, items = [] }) => {
    return (
        <div className="flex flex-col justify-center gap-6 mt-6">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
            />
            <div className="container mx-auto px-7 sm:px-4 md:px-6 lg:px-32">
                <h1 className="text-center text-2xl md:text-3xl font-normal mb-6">{title}</h1>
                <div className="flex justify-center w-full">
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                        {items.map((item, index) => (
                            <li key={index} className="w-full">
                                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden group">
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
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button className="px-8 py-2 border border-black rounded-full transition duration-300 hover:shadow-[inset_0_0_0_1px_black]">
                    Xem thêm
                </button>
            </div>
        </div>
    )
}

export default CollectionSection