import mongoose from "mongoose"
import SessionInterface from "../interfaces/session.interface"


const sessionSchema=new mongoose.Schema<SessionInterface>({
    userAgent:{type:String,required:true},
    userId:{type:String,required:true},
    valid:{type:Boolean,default:true}
},{timestamps:true})
const sessionModel=mongoose.model<SessionInterface>("sessionModel",sessionSchema,"sessions")

export default sessionModel;