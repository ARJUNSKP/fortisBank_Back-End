const jwt=require('jsonwebtoken')
// middleware creating

// it is a function with argument 3 :- req,res,next
const jwtmiddleware=(req,res,next)=>{
    // acces the header data from request
    try{
        const token=req.headers["access_token"]//wen run time error is solving method is {try catch} when any error is coming time when this moves to catch other wise this three no error this movies to try
        // validating token
        jwt.verify(token,'secretkey123')

        // if token varified continue the request
        next()
    }
    catch{
        res.status(404).json("please login")
    }
}
module.exports=jwtmiddleware