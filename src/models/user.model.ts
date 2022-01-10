import mongoose, { HookNextFunction } from "mongoose";
import inuqueValidator from "mongoose-unique-validator";
import UserInterface from "../interfaces/user.interface";
import bcrypt from "bcrypt"
import config from "config"
const userSchema=new mongoose.Schema<UserInterface>({
    email:{type:String,unique:true},
    password:{type:String,select:false}
},{timestamps:true})
userSchema.plugin(inuqueValidator,{message:"excepted {PATH} to be unique"})

userSchema.pre("save",function(this:UserInterface,next:HookNextFunction){
    console.log(this)
    if(!this.isModified("password")) return next();
    bcrypt.genSalt(config.get("bcryptSalt") as number, (err,salt)=> {
        if(err) return next(err)
    bcrypt.hash(this.password, salt,(err:Error | undefined, hash:string)=> {
        if(err) return next(err)
        this.password=hash;
        next()
    });
});
});
userSchema.methods["comparePassword"]=function(this:UserInterface,password:string){
    console.log(this)
    return bcrypt.compare(password,this.password)
}
const userModel=mongoose.model<UserInterface>("userModel",userSchema,"users")


export default userModel;

