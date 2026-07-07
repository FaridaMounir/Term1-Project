const asyncHandler =require("../utils/asyncHandler");
const Product =require("../models/productSchema");
const Category =require("../models/categorySchema");
const AppError =require("../utils/appError");


const create =asyncHandler(async(req, res)=>{
    const {category} =req.body;

    const categoryExist =await Category.findById(category);
    if(!categoryExist){
        throw new AppError("Category not found", 404);
    };

    const newProduct =await Product.create(req.body);
    res.status(201).json({
        status: "Success",
        data: newProduct
    });
});



const getAll =asyncHandler(async(req, res)=>{
    const objQuery ={...req.query};

    let filter= {};

    if(objQuery.category){
        filter.category =objQuery.category;
    };

    if(objQuery.inStock){
        filter.inStock =objQuery.inStock ==="true";
    };

    if(objQuery.minPrice || objQuery.maxPrice){
        filter.price ={};

        if(objQuery.minPrice){
            filter.price.$gte =Number(objQuery.minPrice);
        };

        if(objQuery.maxPrice){
            filter.price.$lte =Number(objQuery.maxPrice);
        };
    };
    if(objQuery.search){
        filter.$or =[
            {
                name: {$regex: objQuery.search, $options: "i"}
            },
            {
                description:{$regex: objQuery.search, $options:"i"}
            }
        ];
    };

    const products =await Product.find(filter).populate("category", "name description");

    res.status(200).json({
        status: "Success",
        data: products,
        result: products.length
    });
});



const getOne =asyncHandler(async(req, res)=>{
     const product =await Product.findById(req.params.id).populate("category", "name description");
    if(!product){
        throw new AppError("Product not found", 404);
        
    };
    res.status(200).json({
        status: "Success",
        data: product
    });
});



const update = asyncHandler(async(req, res)=>{

    if(req.body.category){
        const catExist =await Category.findById(req.body.category);
        if(!catExist){
        throw new AppError("Category doesn't exist", 404);
        };
    }

    const product =await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
    });

    if(!product){
        throw new AppError("Product not found", 404);
        
    };
    res.status(200).json({
        status: "Success",
        data: product
    });
});



const remove = asyncHandler(async(req, res)=>{
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        throw new AppError("Product not found", 404);
    };
    res.status(200).json({
        status: "Success",
        message: "Product deleted successfully."
    });
});

module.exports ={create, getAll, getOne, update, remove};