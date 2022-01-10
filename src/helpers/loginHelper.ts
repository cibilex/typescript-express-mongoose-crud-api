import { Request,Response} from "express";
import { get } from "lodash";
import sessionModel from "../models/session.model";
import config from "config"
import { createCookie, createJwtToken } from "./tokenOperations";
import UserInterface from "../interfaces/user.interface";
export default async (req:Request,res:Response,user:UserInterface)=>{
    const session=await sessionModel.create({
        userAgent:req.get("user-agent")|| "anonymous",
        userId:get(user,"_id")
    })
    //create access
    const accessTokenTTL=config.get("accessTokenTTL") as number;
    const refreshTokenTTL=config.get("refreshTokenTTL") as number;
    const accessToken=createJwtToken({...user.toJSON(),sessionId:session._id},accessTokenTTL)
    //create refresh
    const refreshToken=createJwtToken(session.toJSON(),refreshTokenTTL)
    //send access and refresh
    createCookie(res,{key:"authorization",payload:accessToken})
    createCookie(res,{key:"x-refresh-token",payload:refreshToken})
}