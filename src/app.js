const express=require('express');
const cookieParser=require("cookie-parser")
const authRouter=require("./routes/auth.routes")

const app=express();
//jitne bhi requredt /api/auth ko hit karenge wo sare ke sare authRouter pr redirect honnge
//so hume authRoyter mein 2 endpoint banane honge...chalo auth.rotes.js file mein end point create krne
app.use(express.json())//apna express ka server by default requrest.body ke andar ka data nahi padh sakta isyoye hum ye middleware use krte hia
app.use(cookieParser())
app.use("/api/auth",authRouter)
module.exports=app