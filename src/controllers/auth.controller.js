const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
//user register controller and
//POST /api/auth/register
async function userRegisterController(req,res){
//controller mein kuch data ayega wo data ke sath hume naya user create krna hoga
// wo data kya kya ayega:email,pasword,name
     const {email,password,name}=req.body
     const isExists=await userModel.findOne({
        email:email
     })
     if(isExists){
        return res.status(422).json({
            message:"User already existes with email",
            status:"failed"
        })
     }
     const user=await userModel.create({
        email,password,name
     })
     //jwt.sifn ask = payload ad private key(private key=search on google jwt secret key generator)
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);//next step set token in cookies npm i cookie-parser
}
module.exports={
    userRegisterController
}