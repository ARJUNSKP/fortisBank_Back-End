// import express
const express=require('express')
const logicpath=require('../Controlles/logic')
const jwtmiddleware = require('../middlewares/routerMiddleware')

// create an object for router class in express
const router=new express.Router()

// register the path
router.post('/express/user/user-register',logicpath.register)
router.post('/express/user/user-login',logicpath.login)
router.get('/express/user/user-profile/:acno',jwtmiddleware,logicpath.getProfile)
router.get('/express/user/user-balance/:acno',jwtmiddleware,logicpath.getuserbalance)
router.post('/express/user/user-moneyTransfer',jwtmiddleware,logicpath.moneyTransfer)
router.get('/express/user/transationHistory/:acno',jwtmiddleware,logicpath.TrnHistory)
router.delete('/express/user/delete-account/:acno',jwtmiddleware,logicpath.deleteItem)

// export router
module.exports=router
