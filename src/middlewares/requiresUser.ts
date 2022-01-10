import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { get } from "lodash";
import MyError from "../helpers/MyError";

export default (req:Request,_res:Response,next:NextFunction)=>get(req,"user") ? next() : next(new MyError("you can't enter to here",StatusCodes.FORBIDDEN))