"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const requiresUser_1 = __importDefault(require("../middlewares/requiresUser"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const user_schema_1 = require("../schemas/user.schema");
const router = express_1.default.Router();
router.post("/", (0, validateSchema_1.default)(user_schema_1.createUserSchema), user_controller_1.createUser);
router.get("/", requiresUser_1.default, user_controller_1.readUser);
router.put("/", [requiresUser_1.default, (0, validateSchema_1.default)(user_schema_1.updateUserSchema)], user_controller_1.updateUser);
router.delete("/", requiresUser_1.default, user_controller_1.deleteUser);
router.get("/signout", requiresUser_1.default, user_controller_1.signOut);
router.post("/login", (0, validateSchema_1.default)(user_schema_1.createUserSchema), user_controller_1.login);
exports.default = router;
