"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const logger_1 = __importDefault(require("../logger"));
function default_1(err, _req, res, _next) {
    logger_1.default.error(err);
    switch (err.name) {
        case "ValidationError": {
            err.message = (0, lodash_1.upperFirst)((0, lodash_1.trim)(err.message.split(":")[2]));
            err.code = 400;
        }
    }
    res.status(err.code).json({
        message: err.message || "something went wrong",
        success: false
    });
}
exports.default = default_1;
