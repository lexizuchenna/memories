const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

const postMessage = mongoose.model('postMessage', postSchema)

module.exports = postMessage