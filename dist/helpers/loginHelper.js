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
const lodash_1 = require("lodash");
const session_model_1 = __importDefault(require("../models/session.model"));
const config_1 = __importDefault(require("config"));
const tokenOperations_1 = require("./tokenOperations");
exports.default = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield session_model_1.default.create({
        userAgent: req.get("user-agent") || "anonymous",
        userId: (0, lodash_1.get)(user, "_id")
    });
    //create access
    const accessTokenTTL = config_1.default.get("accessTokenTTL");
    const refreshTokenTTL = config_1.default.get("refreshTokenTTL");
    const accessToken = (0, tokenOperations_1.createJwtToken)(Object.assign(Object.assign({}, user.toJSON()), { sessionId: session._id }), accessTokenTTL);
    //create refresh
    const refreshToken = (0, tokenOperations_1.createJwtToken)(session.toJSON(), refreshTokenTTL);
    //send access and refresh
    (0, tokenOperations_1.createCookie)(res, { key: "authorization", payload: accessToken });
    (0, tokenOperations_1.createCookie)(res, { key: "x-refresh-token", payload: refreshToken });
});
