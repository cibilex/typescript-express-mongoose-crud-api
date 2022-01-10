"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const connectDb_1 = __importDefault(require("./helpers/connectDb"));
const routers_1 = __importDefault(require("./routers"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = config_1.default.get("PORT") || 5050;
(0, connectDb_1.default)();
if (config_1.default.get("mode") === "dev")
    app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
app.use(routers_1.default);
app.use(errorHandler_1.default);
app.listen(PORT, () => logger_1.default.info(`Server listening on http://localhost:${PORT}`));
