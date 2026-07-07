const errorHandler = (err, req, res, next) =>{
    let statusCode = err.statusCode || 500;
    let message =err.message;

    if(err.name ==="CastError"){
        statusCode =400;
        message= `Can't find ID: ${err.value}`;
    };
    if(err.name ==="ValidationError"){
        statusCode =400;
        const msg =Object.values(err.errors)[0].message;
        message=`Validation error: ${msg}`
    };
    if(err.code ===11000){
        statusCode =409;
        const field =Object.keys(err.keyValue)[0];
        message:`"Field value duplicated: ${field}. Please use another value.`
    }

    const response ={
        status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
        message: message
    };

    res.status(statusCode).json(response);
};

module.exports =errorHandler