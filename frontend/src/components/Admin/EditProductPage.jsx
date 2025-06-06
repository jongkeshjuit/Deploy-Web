import React, { useState } from 'react'

const EditProductPage = () => {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        sizes: [],
        colors: [],
        collection: "",
        material: "",
        gender: "",
        images: [
            {
                url: "https://picsum.photos/150?random=1",
                alt: "Product Image",
            },
            {
                url: "https://picsum.photos/150?random=2",
                alt: "Product Image",
            }
        ],
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    };
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        // if (file) {
        //     const formData = new FormData();
        //     formData.append("image", file);
        //     const response = await axios.post("/api/upload", formData);
        //     setProductData((prevData) => ({
        //         ...prevData,
        //         images: [...prevData.images, response.data.url]
        //     }));
        // }
        console.log(file);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productData);
    };
    return (
        <div className=' max-w-5xl mx-auto p-6'>
            <h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* name */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input
                        type='text'
                        name='name'
                        value={productData.name}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                        required
                    />
                </div>
                {/* description */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Description</label>
                    <textarea
                        name='description'
                        value={productData.description}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                        rows={4}
                        required
                    />
                </div>

                {/* price */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Price</label>
                    <input
                        type='number'
                        name='price'
                        value={productData.price}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                    />
                </div>

                {/* count In Stock */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Count In Stock</label>
                    <input
                        type='number'
                        name='countInStock'
                        value={productData.countInStock}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                    />
                </div>

                {/* SKU */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>SKU</label>
                    <input
                        type='text'
                        name='sku'
                        value={productData.sku}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                    />
                </div>

                {/* size */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Size (comma separated)</label>
                    <input
                        type='text'
                        name='sizes'
                        value={productData.sizes.join(", ")}
                        onChange={(e) => setProductData((prevData) => ({
                            ...prevData,
                            sizes: e.target.value.split(",").map((size) => size.trim()).map((size) => size.trim().toUpperCase())
                        }))}
                        className='w-full border border-gray-300 p-2'
                    />
                </div>

                {/* color */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Color (comma separated)</label>
                    <input
                        type='text'
                        name='colors'
                        value={productData.colors.join(", ")}
                        onChange={(e) => setProductData((prevData) => ({
                            ...prevData,
                            colors: e.target.value.split(",").map((color) => color.trim())
                        }))}
                        className='w-full border border-gray-300 p-2'
                    />
                </div>

                {/* category */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Category</label>
                    <input
                        type='text'
                        name='category'
                        value={productData.category}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                        placeholder='Enter category'
                        required
                    />
                </div>

                {/* collection */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Collection</label>
                    <input
                        type='text'
                        name='collection'
                        value={productData.collection}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                        placeholder='Enter collection'
                        required
                    />
                </div>

                {/* material */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Material</label>
                    <input
                        type='text'
                        name='material'
                        value={productData.material}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2'
                        placeholder='Enter material'
                        required
                    />
                </div>

                {/* gender */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Gender</label>
                    <div className='flex gap-4'>
                        <label className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                name='gender'
                                value='male'
                                checked={productData.gender === 'male'}
                                onChange={(e) =>
                                    setProductData((prevData) => ({
                                        ...prevData,
                                        gender: e.target.checked ? 'male' : ''
                                    }))
                                }
                            />
                            Male
                        </label>
                        <label className='flex items-center gap-2'>
                            <input
                                type='checkbox'
                                name='gender'
                                value='female'
                                checked={productData.gender === 'female'}
                                onChange={(e) =>
                                    setProductData((prevData) => ({
                                        ...prevData,
                                        gender: e.target.checked ? 'female' : ''
                                    }))
                                }
                            />
                            Female
                        </label>
                    </div>
                </div>

                {/* image */}
                <div className='mb-6'>
                    <label className='block font-semibold mb-2'>Upload Image</label>
                    <div className="flex items-center">
                        <label className="inline-block px-4 py-1 border border-gray-300 bg-gray-100 text-black rounded cursor-pointer hover:bg-gray-200">
                            Choose file
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="hidden"
                                multiple
                            />
                        </label>
                        <span className="ml-3 text-gray-600">No file chosen</span>
                    </div>
                    <div className='flex gap-4 mt-4'>
                        {productData.images.map((image, index) => (
                            <div key={index} className='relative w-24 h-24'>
                                <img src={image.url} alt={image.alt} className='w-full h-full rounded-md object-cover' />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type='submit'
                    className='w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 cursor-pointer'>Update Product</button>
            </form>
        </div>
    )
}

export default EditProductPage