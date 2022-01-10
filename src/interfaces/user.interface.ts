import { Document } from "mongoose";

export default interface UserInterface extends Document{
    email:string,
    password:string,
    comparePassword:(password:string)=>boolean,
    createdAt:Date,
    updatedAt:Date
}