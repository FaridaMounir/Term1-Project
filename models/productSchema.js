const mongoose =require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    description:{
        type: String
    },
    price:{
        type: Number,
        required:[true, "Price is required"],
        min:[0,"Price cannot be negative"]
    },
    stock:{
        type: Number,
        required:[true, "Stock is requried"],
        min:[0,"stock cannot be negative"],
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true,"Category is requried"],
        ref:"Category"
    },
    images:[
        {
            type: String
        }
    ],
    inStock:{
        type: Boolean,
        default:true
    }
},{timestamps: true});

const Product =mongoose.model("Product",productSchema);

module.exports =Product;