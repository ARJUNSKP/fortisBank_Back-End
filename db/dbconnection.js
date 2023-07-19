// db sever integration

const mongoose=require('mongoose')

// connect with mongodb atlas
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("mongodb atlas connedted");
}).catch(()=>{
    console.log("mongodb connection error");
})