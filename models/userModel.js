import mongoose, { sanitizeFilter } from "mongoose"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"



import validator from "validator"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'provide the email'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    location:{
        type:String,
        default:"India"
    }
},{timestamps:true})

userSchema.pre('save', async function(){
    // if(!this.isModidified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.comparePassword = async function(userPasword){
    const isMatch = await bcrypt.compare(userPasword,this.password)
    return isMatch
}

userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:"1d"})
}

export default mongoose.model("User", userSchema)