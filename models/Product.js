const mongoose = require('mongoose');

const diskSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['hdd', 'ssd'],
    },

    storage : {
        type: String,
        required: true
    }
})

const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ['laptop', 'smartphone', 'tablet', 'smartwatch'],
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    OS: {
        type: String,
        enum: ['android', 'ios', 'macos', 'windows', 'linux'],
        required: true
    },

    version: {
        type: 'String'
    },

    price: {
        type: Number,
        required: true
    },

    releaseDate: {
        type: Date,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    ram: {
        type: String,
        enum: ['1gb', '2gb', '4gb', '8gb', '16gb', '32gb'],
        required: true
    },

    cpu: {
        type: String,
        required: true
    },

    disk: {
        type: diskSchema,
        required: true
    },

    numberSold: {
        type: Number,
        default: 0
    },

    stock: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Product", productSchema);