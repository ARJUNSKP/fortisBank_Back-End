// import jwt
const jwt=require('jsonwebtoken')

// import models

const users = require("../Models/modelcollection.js")

// logic for register
const register=(req,res)=>{ //body={acno:123,"uname":"arjun,"psw":"abc"}
    // access datas from body
    const acno=req.body.acno
    const uname=req.body.uname
    const psw=req.body.psw

    // chick acno is present in user collection
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(401).send("user already exist")
        }
        else{
            // register user -create a new object for user
            var newUser= new users({
                acno,
                uname,
                psw,
                balance:0,
                transaction:[]
            })
            // save the object in collection
            newUser.save()
            // response send to user side
            //json():- js to json convation and send response

            res.json(newUser)
        }
    })
}
const login=(req,res)=>{
    const {acno,psw}=req.body //when same key value acno:acno,psw:psw
    users.findOne({acno,psw}).then(user=>{//to chicking acno:acno,psw:psw to database or not
        if(user){
            
            var token=jwt.sign({acno},'secretkey123')
            res.json({
                acno:user.acno,
                uname:user.uname,
                token
            })
        }
        else{
            res.status(401).json("incrrect password or user name")
        }
    })
}
const getProfile=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname
            })
        }
        else{
            res.status(401).json(" user not exist")
        }
    })
}
const getuserbalance=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                balance:user.balance

            })
        }
        else{
            res.status(401).json(" balancce not exist")
        }
    })
}
const moneyTransfer=(req,res)=>{
    // access all datas form body
    const {fromAcno,toAcno,psw,amount,date}=req.body

    // check from user in db
    users.findOne({acno:fromAcno,psw}).then(fromUser=>{
        if(fromUser){
                // check to user in db
                users.findOne({acno:toAcno}).then(toUser=>{
                    if(toUser){
                        // from balance check
                        if(amount<=fromUser.balance){
                            fromUser.balance-=amount
                            fromUser.transactions.push({type:"DEBIT",amount,date,user:toUser.uname})
                            fromUser.save()

                            toUser.balance+=amount
                            toUser.transactions.push({type:"CREDIT",amount,date,user:fromUser.uname})
                            toUser.save()

                            res.status(200).json({message:"Transation success"})
                        }
                        else{
                            res.status(401).json({message:"insafished balance"})
                        }
                    }
                    else{
                        res.status(401).json({message:"invalid credit credentials"})
                    }
                })
        }
        else{
            res.status(401).json({message:"invalid debit credentials"})
        }
    })
}

const TrnHistory=(req,res)=>{
    const {acno}=req.params

    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json(user.transactions)
        }
        else{
            res.status(401).json('user not exist')
        }
    })
}

const deleteItem=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(user=>{ //delete count is get the user variable
        if(user){
            res.status(200).json('Account Deleted Successfully')
        }
        else{
            res.satatus(401).json('user not exist')
        }
    })
}

module.exports={
    register,
    login,
    getProfile,
    getuserbalance,
    moneyTransfer,
    TrnHistory,
    deleteItem
}