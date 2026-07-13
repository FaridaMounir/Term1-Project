const asyncHandler =require("../utils/asyncHandler");
const Category =require("../models/categorySchema");
const AppError =require("../utils/appError")


const create =asyncHandler(async(req, res)=>{
    const {name, description} =req.body;
    const newCategory = await Category.create({name, description});
    res.status(201).json({
        status: "Success",
        data: newCategory
    });
});


const getAll =asyncHandler(async(req, res)=>{
    const categories = await Category.find({});
    res.status(200).json({
        status: "Success",
        message: "Data loaded successfully", 
        data: categories
    });
});



const getOne =asyncHandler(async(req, res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        throw new AppError("Category not found", 404);
    };
     res.status(200).json({
        status: "Success",
        message: "Data loaded successfully", 
        data: category
    });

});



const update = asyncHandler(async(req, res)=>{
    const category =await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
    })

    if(!category){
        throw new AppError("Category not found", 404);
    };
    res.status(200).json({
        status: "success",
        data: category
    });
});



const remove = asyncHandler(async(req, res)=>{
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category){
        throw new AppError("Category not found", 404);
    };
    res.status(200).json({
        status: "Success",
        message: "Category deleted successfully."
    });
});

module.exports ={create, getAll, getOne, update, remove};