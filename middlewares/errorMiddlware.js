const errorMiddleware = (err,req,res,next)=>{

    const defaultErrors={
        statusCode:500,
        message: err.message
    }


    if(err.name==="ValidationError"){
        defaultErrors.statusCode = 400
        defaultErrors.message = Object.values(err.errors).map(item=>item.message).join(',')
    }
    if(err.code && err.code === 11000 ){
        defaultErrors.statusCode = 400
        defaultErrors.message = `${Object.keys(err.keyValue)} field has to be unique`
    }
    // res.status(500).json({message:err.message})
    res.status(defaultErrors.statusCode).json({message:defaultErrors.message});
}

export default errorMiddleware
