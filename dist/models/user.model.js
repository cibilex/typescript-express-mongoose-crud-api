"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("config"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: { type: String, select: false }
}, { timestamps: true });
userSchema.plugin(mongoose_unique_validator_1.default, { message: "excepted {PATH} to be unique" });
userSchema.pre("save", function (next) {
    console.log(this);
    if (!this.isModified("password"))
        return next();
    bcrypt_1.default.genSalt(config_1.default.get("bcryptSalt"), (err, salt) => {
        if (err)
            return next(err);
        bcrypt_1.default.hash(this.password, salt, (err, hash) => {
            if (err)
                return next(err);
            this.password = hash;
            next();
        });
    });
});
userSchema.methods["comparePassword"] = function (password) {
    console.log(this);
    return bcrypt_1.default.compare(password, this.password);
};
const userModel = mongoose_1.default.model("userModel", userSchema, "users");
exports.default = userModel;
