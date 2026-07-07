const asyncHandler =require("../utils/asyncHandler");
const Cart =require("../models/cartSchema");
const Product =require("../models/productSchema")
const AppError =require("../utils/appError")



const totlaPriceCalc =(cart)=>{
    cart.totalPrice =cart.items.reduce((sum, item)=> sum+(item.quantity *item.price), 0)
};




const cartAdd =asyncHandler(async(req, res)=>{
    const {user, productId, quantity} =req.body;
    const quan =Number(quantity) || 1;

    const product =await Product.findById(productId);
    if (!product){
        throw new AppError("Product doesn't exist", 404);
    }
    if(product.stock <quan){
        throw new AppError("Stock is lower than required quantity.", 400)
    }

    let cart =await Cart.findOne({user});

    if(!cart){
        cart =new Cart({
            user: user,
            items: [],
            totalPrice: 0
        });
        return res.status(201).json({
            status:"success",
            data: cart
        });
    };

    const indexItem =cart.items.findIndex(item => item.product.toString() === productId);

    if(indexItem > -1){
        if(product.stock < (cart.items[indexItem].quantity +quan)){
            throw new AppError("Stock is lower than required quantity.", 400);
        }
        cart.items[indexItem].quantity +=quan;
    }else{
        cart.items.push({
            product: productId,
            price: product.price,
            quantity:quan
        });
    }
    totalPriceCalc();

    await cart.save();
    res.status(200).json({
        status: "success",
        data: cart
    });
});




const cartGet =asyncHandler(async(req,res)=>{
    const {user} = req.query;

    const cart =await Cart.findOne({user}).populate("items.product", "name price");
    if(!cart){
        return res.status(200).json({
            status: "success",
            data: {items: [], totalPrice: 0}
        });
    };
    res.status(200).json({
        status: "Success",
        data: cart
    });
});




const itemUpdate =asyncHandler(async(req, res)=>{
    const {user, quantity} =req.body;
    const {productId} =req.params;
    const quan =Number(quantity);

    const cart =await Cart.findOne({user});
    if(!cart){
        throw new AppError("Cart not found", 404);
    };
    const itemIndex = cart.items.findIndex(item => item.product.toString()=== productId);
    if(itemIndex === -1){
        throw new AppError("Item not in cart", 404);
    };
    if (quan <= 0){
        cart.items.splice(indexItem, 1)
    }
    totalPriceCalc(cart);
    await cart.save();
    res.status(200).json({
        status: "success",
        data: cart
    });
});




const itemRemove =asyncHandler(async(req, res)=>{
    const {user} =req.body;
    const{productId} =req.params;

    let cart =await Cart.findOne ({user});
    if(!cart){
        throw new AppError("Cart not found", 404)
    }

    cart.items = cart.items.filter(item => item.product.toString() !==productId);

    totalPriceCalc(cart);
    await cart.save();

    res.status(200).json({
        status:"Success",
        message: "Item removed successfully",
        data: cart
    });
});




const cartClear =asyncHandler(async(req, res)=>{
   const {user} =req.body;

   let cart =await Cart.findOne({user});
    if(!cart){
        throw new AppError("Cart not found", 404);
    }
    cart.items =[];
    cart.totalPrice =0;
    await cart.save();

    res.status(200).json({
        status:"Success",
        message: "All cart items deleted successfully",
        data: cart
    });
});

module.exports ={cartAdd, cartGet, itemRemove, cartClear,itemUpdate };