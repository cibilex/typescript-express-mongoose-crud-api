import { Request } from "express";
import SessionInterface from "./session.interface";
import UserInterface from "./user.interface";
interface ReqUser extends UserInterface{
    sessionId:SessionInterface["id"]
}
export default interface NewRequest extends Request{
    user:ReqUser | null | undefined;
}