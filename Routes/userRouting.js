// import express
const express=require('express')
const logicpath=require('../Controlles/logic')

// create an object for router class in express
const router=new express.Router()

// register the path
router.post('/express/user/user-register',logicpath.register)

// export router
module.exports=router
