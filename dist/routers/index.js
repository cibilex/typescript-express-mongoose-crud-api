"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControl_1 = __importDefault(require("../middlewares/userControl"));
const router = express_1.default.Router();
const user_routers_1 = __importDefault(require("./user.routers"));
router.use(userControl_1.default);
router.get("/", (_req, res) => res.send("hi"));
router.use("/user", user_routers_1.default);
exports.default = router;
