"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.deleteUser = exports.updateUser = exports.login = exports.readUser = exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
const MyError_1 = __importDefault(require("../helpers/MyError"));
const http_status_codes_1 = require("http-status-codes");
const loginHelper_1 = __importDefault(require("../helpers/loginHelper"));
const session_model_1 = __importDefault(require("../models/session.model"));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("istek geldi");
    console.log(req.body);
    const user = yield user_model_1.default.create(req.body);
    //create user
    //create session
    yield (0, loginHelper_1.default)(req, res, user);
    res.json({
        message: "successfully registered",
        success: true
    });
}));
exports.readUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById((0, lodash_1.get)(req, "user._id"));
    if (!user)
        throw new MyError_1.default("no user with that id", 400);
    res.json({
        success: true,
        user
    });
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: req.body.email }).select("+password");
    if (!user)
        throw new MyError_1.default("no user with that email", http_status_codes_1.StatusCodes.BAD_REQUEST);
    const isValidPassword = yield user.comparePassword(req.body.password);
    if (!isValidPassword)
        throw new MyError_1.default("password and email not compatible", http_status_codes_1.StatusCodes.BAD_REQUEST);
    yield (0, loginHelper_1.default)(req, res, user);
    res.json({
        success: true,
        message: "successfully logined"
    });
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(req.user._id, Object.assign({}, req.body), { runValidators: true, new: true, context: "query" }).lean();
    if (!user)
        throw new MyError_1.default("no user with that id", http_status_codes_1.StatusCodes.BAD_REQUEST);
    res.json({
        success: true,
        message: "successfully updated"
    });
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndDelete(req.user._id).lean();
    if (!user)
        throw new MyError_1.default("no user with that id", http_status_codes_1.StatusCodes.BAD_REQUEST);
    const session = yield session_model_1.default.findByIdAndUpdate(req.user.sessionId, { valid: false }, { runValidators: true, new: true }).lean();
    if (!session)
        throw new MyError_1.default("no session with that id", http_status_codes_1.StatusCodes.BAD_REQUEST);
    res.clearCookie("authorization");
    res.clearCookie("x-refresh-token");
    res.json({
        message: "successfully user deleted",
        success: true
    });
}));
exports.signOut = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield session_model_1.default.findByIdAndUpdate(req.user.sessionId, { valid: false }, { runValidators: true, new: true }).lean();
    if (!session)
        throw new MyError_1.default("no session with that id", http_status_codes_1.StatusCodes.BAD_REQUEST);
    res.clearCookie("authorization");
    res.clearCookie("x-refresh-token");
    res.json({
        message: "successfully signout operation done",
        success: true
    });
}));
