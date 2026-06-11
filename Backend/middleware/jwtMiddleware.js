const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json("Token Missing")
    }

    try{

        const verify=jwt.verify(token,process.env.SECRET_KEY)

        req.userId=verify.userId

        next()

    }
    catch(err){
        res.status(401).json("Invalid Token")
    }

}