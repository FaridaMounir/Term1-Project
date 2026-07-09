//I use mongoDB atlas bec the compass doesn't work and this helps me to connect to DB
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "8.8.8.8"]);


require("dotenv").config();
const express =require("express");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter =require("./routes/productRoutes");
const cartRouter =require("./routes/cartRoutes");
const orderRouter =require("./routes/orderRoutes");
const{body, validationResult}= require("express-validator")
const mongoSanitize =require("express-mongo-sanitize")
const errorHandler =require("./middleware/errorHandler");
const AppError =require("./utils/appError");
const connectDB =require("./db/connect");
const config =require("./config/config");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: req.query,
    writable: true,
    enumerable: true,
    configurable: true
  });
  next();
});

app.use(mongoSanitize());


app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter)

app.use((req, res, next)=>{
    next(new AppError(`Error: ${req.originalUrl} Not found `, 404));
})

app.use(errorHandler);


const start = async ()=>{
    await connectDB();
    app.listen(config.port, ()=>{
        console.log(`Server running on port ${config.port}`)
    });
};

start();