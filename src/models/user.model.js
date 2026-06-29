const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")

const userSchema = new mongoose.Schema(
{//properrties
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        unique:true,
        lowercase:true,
        match:[
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid Email address"
        ]
    },

    name:{
        type:String,
        required:[true,"Name is required for creating an account"]
    },

    password:{
        type:String,
        required:[true,"Password is required for creating an account"],
        minlength:[6,"Password should contain at least 6 characters"],
        select:false
    }

},
{
    timestamps:true
});
userSchema.pre("save",async function(next){
    // if user password is changed then it is hashed
    if(!this.isModified("password")){
        return next()
    }
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
    return next()
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
const userModel=mongoose.model("user",userSchema)
module.exports=userModel