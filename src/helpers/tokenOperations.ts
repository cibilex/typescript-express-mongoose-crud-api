import jwt from "jsonwebtoken";
import config from "config"
import { CookieOptions, Response } from "express";


export const createJwtToken=(payload:jwt.JwtPayload,expiresIn:jwt.SignOptions["expiresIn"])=>{
    return jwt.sign(payload,config.get("jwtKey"),{expiresIn}) //date must be second format.Not milisecond
}
export const createCookie=(res:Response,py:{key:string,payload:object | string,maxAge?:CookieOptions["maxAge"]})=>
res.cookie(
    py.key,py.payload,{secure:config.get("mode")==="dev" ? false :true,httpOnly:true}
)
type verifyJwtToken =(token:string)=>{decode:null | object,expired:boolean}
export const verifyJwtToken=(token:string)=>{
    try{
        const decode=jwt.verify(token,config.get("jwtKey"))
        return {expired:false,decode}
    }catch(err:any){
        return {expired:err.message==="jwt expired",decode:null}
    }
}
