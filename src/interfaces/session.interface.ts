import { Document } from "mongoose";
import UserInterface from "./user.interface";

export default interface SessionInterface extends Document{
    userAgent:string,
    userId:UserInterface["id"],
    valid:boolean,
    createdAt:Date,
    updatedAt:Date
}