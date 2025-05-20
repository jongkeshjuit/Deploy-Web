import React from 'react'
import CollectionSection from './CollectionSection'

const GenderCollectionSection = () => {
    const collection1 = {
        title: 'BST Áo thun họa tiết',
        imageUrl: 'https://images6.alphacoders.com/134/thumb-1920-1342229.png',
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
        ]
    };

    const collection2 = {
        title: 'BST Mùa hè năng động',
        imageUrl: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=1400&q=80',
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
        ]
    };

    return (
        <section className='py-16'>
            <div>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-4xl font-mendium tracking-wider'>Khám phá bộ sưu tập của Wukudada.</h2>
                </div>
                <CollectionSection {...collection1} />
                <CollectionSection {...collection2} />
            </div>
        </section>
    )
}

export default GenderCollectionSection