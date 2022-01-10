import mongoose from "mongoose";
import config from "config"
import log from "../logger";

export default async function connectDb(){
    const dbUrl=config.get("dbUrl") as string;

try{
    await mongoose.connect(dbUrl)
    log.info("successfully connected to db")
}catch(err){
    log.error(err)
    process.exit(1)
}
}