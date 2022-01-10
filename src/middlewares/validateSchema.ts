
import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import MyError from "../helpers/MyError";
import {StatusCodes} from 'http-status-codes';

export default (schema:AnySchema)=>async (req:Request,_res:Response,next:NextFunction)=>{
     try{
         await schema.validate({...req.body,...req.params,...req.query});
         next()
     }catch(err:any){
         next(new MyError(err.errors,StatusCodes.BAD_REQUEST))
     }
 }
