const jwt=require("jsonwebtoken");
const blacklist=require("../blacklist");

const SECRET="secret45";

module.exports=function(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Token missing"})
    }
    const token=authHeader.split(" ")[1];
    if(blacklist.includes(token)){
        return res.status(403).json({
            message:"Token Invalidated"
        })
    }

    try{
        const decoded=jwt.verify(token,SECRET);
        req.user=decoded;
        req.token=token;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}