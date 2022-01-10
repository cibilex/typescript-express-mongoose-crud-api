"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const lodash_1 = require("lodash");
const MyError_1 = __importDefault(require("../helpers/MyError"));
exports.default = (req, _res, next) => (0, lodash_1.get)(req, "user") ? next() : next(new MyError_1.default("you can't enter to here", http_status_codes_1.StatusCodes.FORBIDDEN));
