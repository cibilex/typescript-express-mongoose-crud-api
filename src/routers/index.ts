import express, { Request, Response } from "express"
import userControl from "../middlewares/userControl"
const router=express.Router()
import userPath from "./user.routers"

router.use(userControl)
router.get("/",(_req:Request,res:Response)=>res.send("hi"))
router.use("/user",userPath)


export default router;