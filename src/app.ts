import express from "express";
import log from "./logger";
import config from "config"
import morgan from "morgan";
import connectDb from "./helpers/connectDb";
import routers from "./routers";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser"
import cors from "cors"
const app=express()
const PORT=config.get("PORT") || 5050;
connectDb();
if(config.get("mode") === "dev")app.use(morgan("dev"))

app.use(express.static("public"))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(routers)
app.use(errorHandler)
app.listen(PORT,()=>log.info(`Server listening on http://localhost:${PORT}`))
