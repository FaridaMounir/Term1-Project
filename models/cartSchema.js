const mongoose =require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: [true, "product is required"]
    },
    quantity:{
        type: Number,
        required: [true, "quantity is required"],
        default: 1
    },
    price:{
        type: Number,
        required: [true, "price is required"]
    }
});


const cartSchema =new mongoose.Schema({
    user: {
        type: String,
        required:[true, "User is required"],
        unique: true
    },
    items:[cartItemSchema],
    totalPrice:{
        type: Number,
        required: true,
        default: 0
    }

},{timestamps: true});



const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;