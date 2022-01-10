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
const MyError_1 = __importDefault(require("../helpers/MyError"));
const http_status_codes_1 = require("http-status-codes");
exports.default = (schema) => (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.validate(Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query));
        next();
    }
    catch (err) {
        next(new MyError_1.default(err.errors, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
});
