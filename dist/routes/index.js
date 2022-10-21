"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const index = (app) => {
    app.use(user_routes_1.default);
};
exports.default = index;
//# sourceMappingURL=index.js.map