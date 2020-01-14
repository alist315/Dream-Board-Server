const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Dream = new Schema(
    {
        name: { type: String, required: true },
        type: { type: [String], required: true },
        pic: { type: String, required: true },
        location: { type: String, required:true}
    },
)

module.exports = mongoose.model('dreams', Dream)
