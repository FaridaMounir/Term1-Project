const mongoose =require("mongoose");

const orderSchema =new mongoose.Schema ({
    orderNumber:{
        type: Number,
        required: true,
        unique:true
    },
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required: true
        },
        name:{
            type: String,
            required: [true, "Name is required."]
        },
        price: {
            type: Number,
            required:[true, "Price is required"]
        },
        quantity:{
            type: Number,
            required:[true, "Quantity is required"]
        }
    }],
    totalPrice:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "shipping", "delivered", "cancelled"],
        default: "pending"
    },
    shippingAddress:{
        type: String,
        required: [true, "Address is required"]
    }

    
},{timestamps: true});

const order = mongoose.model("Order", orderSchema);

module.exports =order;