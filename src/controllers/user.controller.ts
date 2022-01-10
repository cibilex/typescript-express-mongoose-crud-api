
import {  Request, Response } from "express";
import  expressAsyncHandler from "express-async-handler";
import { get } from "lodash";
import userModel from "../models/user.model";
import MyError from "../helpers/MyError";
import { StatusCodes } from "http-status-codes";
import loginHelper from "../helpers/loginHelper"
import sessionModel from "../models/session.model";
export const createUser=expressAsyncHandler(async (req:Request,res:Response)=>{
    console.log("istek geldi")
    console.log(req.body)
    const user=await userModel.create(req.body)
    //create user
    //create session
  await  loginHelper(req,res,user)
    res.json({
        message:"successfully registered",
        success:true
    })
})

export const readUser=expressAsyncHandler(async (req:Request,res:Response)=>{
    const user=await userModel.findById(get(req,"user._id"));
    if(!user) throw new MyError("no user with that id",400);
    res.json({
        success:true,
        user
    })
})

export const login=expressAsyncHandler(async (req:Request,res:Response)=>{
    const user=await userModel.findOne({email:req.body.email}).select("+password");
    if(!user) throw new MyError("no user with that email",StatusCodes.BAD_REQUEST)
    const isValidPassword=await user.comparePassword(req.body.password);
    
    if(!isValidPassword) throw new MyError("password and email not compatible",StatusCodes.BAD_REQUEST);
   await loginHelper(req,res,user)
    res.json({
        success:true,
        message:"successfully logined"
    })
})
export const updateUser=expressAsyncHandler(async (req:Request,res:Response)=>{
    const user=await userModel.findByIdAndUpdate(req.user._id,{
        ...req.body
    },{runValidators:true,new:true,context:"query"}).lean()
    if(!user) throw new MyError("no user with that id",StatusCodes.BAD_REQUEST);
    res.json({
        success:true,
        message:"successfully updated"
    })
})

export const deleteUser=expressAsyncHandler(async(req:Request,res:Response)=>{
    const user=await userModel.findByIdAndDelete(req.user._id).lean();
    if(!user) throw new MyError("no user with that id",StatusCodes.BAD_REQUEST);
    const session=await sessionModel.findByIdAndUpdate(req.user.sessionId,{valid:false},{runValidators:true,new:true}).lean()
    if(!session) throw new MyError("no session with that id",StatusCodes.BAD_REQUEST)
    res.clearCookie("authorization");
    res.clearCookie("x-refresh-token");
    res.json({
        message:"successfully user deleted",
        success:true
    })
})
export const signOut=expressAsyncHandler(async (req:Request,res:Response)=>{
    const session=await sessionModel.findByIdAndUpdate(req.user.sessionId,{valid:false},{runValidators:true,new:true}).lean()
    if(!session) throw new MyError("no session with that id",StatusCodes.BAD_REQUEST)
    res.clearCookie("authorization");
    res.clearCookie("x-refresh-token");
    res.json({
        message:"successfully signout operation done",
        success:true
    })
})

