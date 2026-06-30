const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")

//POST /api/auth/register
async function userRegisterController(req,res){
    try {
        const {email, password, name} = req.body

        if (!email || !password || !name) {
            return res.status(400).json({
                message: "email, password and name are required",
                status: "failed"
            })
        }

        const isExists = await userModel.findOne({ email })
        if (isExists) {
            return res.status(422).json({
                message: "User already exists with this email",
                status: "failed"
            })
        }

        const user = await userModel.create({ email, password, name })

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token)
        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token
        })
    } catch (err) {
        console.error("Register error:", err.message)
        res.status(500).json({
            message: err.message || "Internal server error",
            status: "failed"
        })
    }
}

module.exports = { userRegisterController }