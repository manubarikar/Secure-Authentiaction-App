const express=require("express");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const app=express();

const SECRET="secret45";

const USER={
    username:"admin",
    password:"admin123"
}

app.post("/api/login",(req,res)=>{
    const{username,password}=req.body;
    if(username!==USER.username || password !== USER.password){
        return res.status(401).json({message:"Invalid User Credentials"})
    }

    const token=jwt.sign({username}, SECRET, {expiresIn:"1h"})
    loginTime=new Date();
    res.status(200).json(token);
})

app.get("/api/profile",authmiddleware,(req,res)=>{
    res.status(200).json({
        username:req.user.username,
        message:`Welcome ${req.user.username}`,
        loginTime
    })
})

app.post("/api/logout",authmiddleware,(req,res)=>{
    const token=req.token;
    blacklist.push(token)
    res.status(200).json({
        message:"Logged out Successfully"
    })
})

const PORT=5000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} `)
})