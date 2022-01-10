import { NextFunction, Request, Response } from "express";
import { trim, upperFirst } from "lodash";
import log from "../logger";

export default function (err:any,_req:Request,res:Response,_next:NextFunction){
    log.error(err)
    switch(err.name){
        case "ValidationError":{
            err.message=upperFirst(trim(err.message.split(":")[2]));
            err.code=400
        }
    }
    res.status(err.code).json({
        message:err.message || "something went wrong",
        success:false
    })
}