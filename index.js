// 1// import express
const express =require('express')

// 4 import env file
require('dotenv').config()//import to using

// 2// create server using express
const server = express()

// conneting db folder connting to db conneting wanting
require('./db/dbconnection')
// import to the Router folder userRouting.js
const rout = require('./Routes/userRouting')



// import cors
const cors=require('cors')
const router = require('./Routes/userRouting')

server.use(cors())
// to convert all incomming json datas into js
server.use(express.json())

server.use(rout)


// {
    // api saperat path in each option
// server.get('/excgetpath/newuser',(req,res)=>{
//     res.send("get request rsponse1")
// })
// server.get('/excgetpath/lastuser',(req,res)=>{
//     res.send("get request rsponse2")
// })
// }

// 3// port set
const port=3000 || process.env.port

// // rining config
server.listen(port,()=>{
    console.log(`server is renning ${port} this port`);
})