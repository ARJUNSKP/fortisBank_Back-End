// import mongodb is wanted to mongoose connecting
const mongoose=require('mongoose')

// create model for collection
// model name user
const users =new mongoose.model("users",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})

module.exports=users