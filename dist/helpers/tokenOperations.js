"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.createCookie = exports.createJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const createJwtToken = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.get("jwtKey"), { expiresIn }); //date must be second format.Not milisecond
};
exports.createJwtToken = createJwtToken;
const createCookie = (res, py) => res.cookie(py.key, py.payload, { secure: config_1.default.get("mode") === "dev" ? false : true, httpOnly: true });
exports.createCookie = createCookie;
const verifyJwtToken = (token) => {
    try {
        const decode = jsonwebtoken_1.default.verify(token, config_1.default.get("jwtKey"));
        return { expired: false, decode };
    }
    catch (err) {
        return { expired: err.message === "jwt expired", decode: null };
    }
};
exports.verifyJwtToken = verifyJwtToken;
