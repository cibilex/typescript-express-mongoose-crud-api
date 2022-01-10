import { NextFunction,  Request,  Response } from "express";
import { get } from "lodash";
import { createCookie, createJwtToken, verifyJwtToken } from "../helpers/tokenOperations";
// import NewRequest from "../interfaces/newRequest";
import sessionModel from "../models/session.model";
import userModel from "../models/user.model";
import config from "config"
import log from "../logger";

export default async(req:Request,res:Response,next:NextFunction)=>{
    const accessToken=get(req,"cookies.authorization")
    if(!accessToken) return next()
    const {decode,expired}=verifyJwtToken(accessToken)
    if(decode){

        req.user=decode;
        return next()
    }


    const refreshToken=req.cookies["x-refresh-token"];    
    if(!expired || !refreshToken) return next()
    log.info("will create a new access token")
        const {decode:refreshDecode}=verifyJwtToken(refreshToken);
        if(!refreshDecode) return next()
        const session=await sessionModel.findById(get(refreshDecode,"_id")).lean()
        if(!session || !session.valid) return next();
        const user=await userModel.findById(session.userId).lean()
        if(!user) return next();
        const newAccessTokenTTL=config.get("accessTokenTTL") as number;
        const accessPeyload={...user,sessionId:session._id}
        const newAccessToken=createJwtToken(accessPeyload,newAccessTokenTTL)
        req.user=accessPeyload;
        createCookie(res,{key:"authorization",payload:newAccessToken})
        
    next()
}