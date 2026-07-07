const mongoose =require("mongoose");
const config =require("../config/config");

const connectDB =async()=>{
    try{
    const connect = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB Atlas connected successfully: ${connect.connection.host}`);
    }catch(error){
        console.error(`Connection Error! : ${error.message}`);

        process.exit(1)
    }
};


module.exports =connectDB;