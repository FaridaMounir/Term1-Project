const Order =require("../models/orderSchema");
const Cart =require("../models/cartSchema");
const asyncHandler =require("../utils/asyncHandler");
const AppError =require("../utils/appError");
const Product =require("../models/productSchema");
const checkOut =asyncHandler(async(req, res)=>{
    const {user, shippingAddress} =req.body;

    const cart =await Cart.findOne({user: user}).populate("items.product");



    if(!cart || cart.items.length ===0){
        throw new AppError("Cart is empty", 400);
    };
    let totalPrice =0;
    let orderItems =[];


    for (const cartItem of cart.items){
        const product = cartItem.product;
        if (!product) {
            throw new AppError("One of the items in your cart is no longer available.", 404);
        }
        if (product.stock < cartItem.quantity) {
            throw new AppError(`${product.name}'s stock not enough.`, 400);
        }

            totalPrice += product.price *cartItem.quantity
            orderItems.push({
                name: product.name,
                product: product._id,
                price: product.price,
                quantity: cartItem.quantity
            
            });

    };
    for (const cartItem of cart.items) {
         await Product.findByIdAndUpdate(cartItem.product._id, {
        $inc: { stock: -cartItem.quantity }
    });
}
    const orderNumber =Date.now()+Math.floor(Math.random() *1000)
    const newOrder =new Order({
        orderNumber: orderNumber,
        totalPrice: totalPrice,
        items: orderItems,
       shippingAddress: shippingAddress
    });
    await newOrder.save();

    cart.items=[];
    await cart.save();
    res.status(201).json({
        message: "order is successfully placed",
        order: newOrder
    });

});


const allOrders =asyncHandler(async(req, res)=>{
    const orders =await Order.find();
    res.status(200).json({
        orders: orders
    });
});

const getById =asyncHandler(async(req, res)=>{
    const order =await Order.findById(req.params.id);

    if(!order){
        throw new AppError("Order not found", 404);
    };
    res.status(200).json({
        status: "success",
        order: order
    });
});


const update =asyncHandler(async(req, res)=>{
    const {status} =req.body;

    const order =await Order.findById(req.params.id);

    if(!order){
        throw new AppError("Order not found", 404);
    };

    order.status =status;
    await order.save();

    res.status(200).json({
        status: "success",
        message: "Status updates successfully",
        order: order
    });
});

module.exports={checkOut, allOrders, getById, update};