"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    userAgent: { type: String, required: true },
    userId: { type: String, required: true },
    valid: { type: Boolean, default: true }
}, { timestamps: true });
const sessionModel = mongoose_1.default.model("sessionModel", sessionSchema, "sessions");
exports.default = sessionModel;
