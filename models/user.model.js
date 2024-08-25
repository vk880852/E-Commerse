import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
const userSchema=new Schema
(
    {
         username:
         {
          type:String,
          required:true,
          lowercase:true,
          trim:true,
          index:true,
          unique:true
         },
          fullname:
          {
            type:String,
            required:true,
          },
          email:{
            type:String,
            index:true,
            required:true,
          },
          password:{
            type:String,
            required:[true,"password is required"],
          },
          admin:{
            type:Boolean,
            required:true
          },
          refreshtoken:
          {
            type:String
          },
          mobilenumber:
          {
            type:Number,
            required:true,
          },
          address:
          {
            type:String,
            required:true
          }
    },
    {
        timestamps:true
    }
);
userSchema.pre("save", async function(next) {
  try {
      if (!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password, 16);
      next();
  } catch (error) {
      console.log(`Error happened during hashing the value ${error}`);
      next(error);
  }
});
userSchema.methods.isPasswordCorrect=async function(password)
{
  
    try{
         return await bcrypt.compare(password,this.password);
    }
    catch(error)
    {
         console.log("Error Happened during Password Matching")
    }
}
userSchema.methods.generateRefreshToken=function()
{
   return jwt.sign({
    _id:this._id
   },
   process.env.REFRESH_TOKEN_KEY,
   {
    expiresIn:process.env.EXPIRY_DATE
   })
}
userSchema.methods.generateAccessToken=function()
{
  return jwt.sign(
  {
    _id:this._id
  },
  process.env.ACCESS_TOKEN_KEY,
  {
    expiresIn:process.env.ACCESS_TOKEN_KEY_EXPIRY_DATE
  }
)
}
export const User=mongoose.model("User",userSchema);