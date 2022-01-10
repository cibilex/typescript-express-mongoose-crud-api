"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = MyError;
