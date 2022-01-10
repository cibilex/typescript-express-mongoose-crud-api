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
const tokenOperations_1 = require("../helpers/tokenOperations");
// import NewRequest from "../interfaces/newRequest";
const session_model_1 = __importDefault(require("../models/session.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../logger"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, "cookies.authorization");
    if (!accessToken)
        return next();
    const { decode, expired } = (0, tokenOperations_1.verifyJwtToken)(accessToken);
    if (decode) {
        req.user = decode;
        return next();
    }
    const refreshToken = req.cookies["x-refresh-token"];
    if (!expired || !refreshToken)
        return next();
    logger_1.default.info("will create a new access token");
    const { decode: refreshDecode } = (0, tokenOperations_1.verifyJwtToken)(refreshToken);
    if (!refreshDecode)
        return next();
    const session = yield session_model_1.default.findById((0, lodash_1.get)(refreshDecode, "_id")).lean();
    if (!session || !session.valid)
        return next();
    const user = yield user_model_1.default.findById(session.userId).lean();
    if (!user)
        return next();
    const newAccessTokenTTL = config_1.default.get("accessTokenTTL");
    const accessPeyload = Object.assign(Object.assign({}, user), { sessionId: session._id });
    const newAccessToken = (0, tokenOperations_1.createJwtToken)(accessPeyload, newAccessTokenTTL);
    req.user = accessPeyload;
    (0, tokenOperations_1.createCookie)(res, { key: "authorization", payload: newAccessToken });
    next();
});
