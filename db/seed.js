// for running database and not giving error
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const mongoose =require("mongoose");
const connectDB =require("../db/connect");
const Product =require("../models/productSchema");
const Category =require("../models/categorySchema");
const Order =require("../models/orderSchema")


const Seed =async()=>{
    try{
        await connectDB()
        console.log("MongoDB connected sucessfully!");

        await Order.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log("Data cleared from database!");

        const category1 =await Category.create({
            name: "Electronics",
            description:"Laptops and other smart devices."
        });

        const category2 =await Category.create({
            name: "Clothing",
            description:"Accessories ,shirts and pants."
        });

        const category3 =await Category.create({
            name: "Books",
            description:"Scientific, fictional and educational books."
        });
        const category4 =await Category.create({
            name: "Appliances",
            description: "Devices for household functions"
        })

        const demoProducts =[
            {
                name: "Hp EliteBook 665 G4",
                price: 3261,
                stock: 98,
                category: category1._id
            },
            {
                name: "AirPods Pro",
                price: 1452,
                stock: 121,
                category: category1._id
            },
            {
                name: "Xiaomi robot vaccum",
                price: 2671,
                stock: 54,
                category: category4._id
            },
            {
                name: "Snake necklace",
                price: 67,
                stock: 736,
                category: category2._id
            },
            {
                name: "The wide space",
                price: 93,
                stock: 98,
                category: category3._id
            },
            {
                name: "Voleyball shoes",
                price: 826,
                stock: 67,
                category: category2._id
            },
            {
                name: "Samsung fridge",
                price: 6215,
                stock: 78,
                category: category4._id
            }

        ];
       const create = await Product.insertMany(demoProducts);
        console.log("Products have been added successfully!!");
        console.log(`Loaded: ${create.length} products!`);

    }catch(error){
        console.error("An error occured", error.message);
    }finally{
        await mongoose.disconnect();
        console.log("Mongoose disconnected");
    }
};

Seed();