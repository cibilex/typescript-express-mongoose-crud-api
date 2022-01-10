import express from "express"
import { createUser, deleteUser, login, readUser, signOut, updateUser } from "../controllers/user.controller";
import requiresUser from "../middlewares/requiresUser";
import validateSchema from "../middlewares/validateSchema";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const router=express.Router()
router.post("/",validateSchema(createUserSchema),createUser)
router.get("/",requiresUser,readUser)
router.put("/",[requiresUser,validateSchema(updateUserSchema)],updateUser)
router.delete("/",requiresUser,deleteUser)
router.get("/signout",requiresUser,signOut)
router.post("/login",validateSchema(createUserSchema),login)

export default router;