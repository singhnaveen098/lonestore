const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name:{type: String, required: true},
    slug:{type: String, required: true, unique: true},
    desc:{type: String, required: true},
    img:{type: String, required: true},
    category:{type: String, required: true},
    size:{type: String},
    color:{type: String},
    price:{type: Number, required: true},
    availableqty:{type: Number, required: true},
}, {timestamps: true})

export default mongoose.model("Product", productschema)