const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    discountPrice: {
        type: Number,
        min: 0,
    },

    countInStock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },

    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    category: {
        type: String,
        required: true,
        trim: true,
    },

    brand: {
        type: String,
        required: true,
        trim: true,
    },

    sizes: {
        type: [String],
        required: true,
    },

    colors: {
        type: [String],
        required: true,
    },

    collection: {
        type: String,
        required: true,
        trim: true,
    },

    material: {
        type: String,
        required: true,
        trim: true,
    },

    gender: {
        type: String,
        required: true,
        enum: ["man", "woman", "unisex"], // theo đúng JSON
        lowercase: true,
    },

    images: [
        {
            url: {
                type: String,
                required: true,
            },
            altText: {
                type: String,
                required: true,
            },
        },
    ],

    isFeatured: {
        type: Boolean,
        default: false,
    },

    isPublished: {
        type: Boolean,
        default: true,
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    numReviews: {
        type: Number,
        default: 0,
        min: 0,
    },

    tags: [
        {
            type: String,
            trim: true,
        },
    ],

    metaTitle: {
        type: String,
        trim: true,
    },

    metaDescription: {
        type: String,
        trim: true,
    },

    metaKeywords: [
        {
            type: String,
            trim: true,
        },
    ],

    dimensions: {
        length: {
            type: Number,
            required: true,
            min: 0,
        },
        width: {
            type: Number,
            required: true,
            min: 0,
        },
        height: {
            type: Number,
            required: true,
            min: 0,
        },
        weight: {
            type: Number,
            required: true,
            min: 0,
        },
    },

    // Nếu muốn thêm tracking người tạo thì bật lại:
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },

    // Optional fields theo UI
    details: {
        type: [String],
        default: [],
    },

    care: {
        type: String,
        trim: true,
    },
},
    {
        timestamps: true,
        suppressReservedKeysWarning: true,
    });

module.exports = mongoose.model('Product', productSchema);
