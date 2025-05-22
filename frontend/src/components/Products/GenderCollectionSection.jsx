import React from 'react'
import CollectionSection from './CollectionSection'
import bannerLinenWomen from '../../assets/images/linen/banner-linen-collection-women.jpg'
import bannerLinenMen from '../../assets/images/linen/banner-linen-collection-men.jpg'


const GenderCollectionSection = () => {
    const collections = [
        {
            sex: 'Women',
            title: 'Linen Collection',
            mediaUrl: bannerLinenWomen, // Đường dẫn đúng cho Vite
            mediaType: 'image',
            items: [
                {
                    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo thun họa tiết 1'
                },
                {
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo thun họa tiết 2'
                },
                {
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo thun họa tiết 3'
                },
                {
                    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo thun họa tiết 4'
                }
            ],
            link: '/linen',
        },
        {
            sex: 'Men',
            title: 'Linen Collection',
            mediaUrl: bannerLinenMen,
            mediaType: 'image',
            items: [
                {
                    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo mùa hè 1'
                },
                {
                    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo mùa hè 2'
                },
                {
                    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo mùa hè 3'
                },
                {
                    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
                    title: 'Áo mùa hè 4'
                }
            ],
            link: '/linen',
        }
    ]

    return (
        <section className='py-16'>
            <div className='flex flex-col items-center justify-center'>
                <h2 className='text-4xl font-normal tracking-wider mb-2'>
                    Khám phá bộ sưu tập của Wukudada.
                </h2>
                {collections.map((collection, index) => (
                    <CollectionSection key={index} {...collection} />
                ))}
            </div>
        </section>
    );

}

export default GenderCollectionSection