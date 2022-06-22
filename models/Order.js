const mongoose = require('mongoose')

const orderschema = new mongoose.Schema({
    userid:{type: String, required: true},
    products:[{
        productid:{type: String, required:true},
        quantity:{type: Number, default: 1}
    }],
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: "pending", required: true}
}, {timestamps: true})

export default mongoose.model("Order", orderschema)