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
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const response_1 = require("../utilities/response");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const create = yield (0, user_service_1.registerUser)(req.body);
        if (create.status) {
            return (0, response_1.sendSuccessResponse)(res, create.message, create.data, 201);
        }
        console.log("berrr");
        return (0, response_1.sendErrorResponse)(req, res, create.message, {}, 400);
    }
    catch (err) {
        return (0, response_1.sendErrorResponse)(req, res, "UNKNOWN_ERROR", {}, 500);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let login = yield (0, user_service_1.loginUser)(req.body);
        if (login.status) {
            return (0, response_1.sendSuccessResponse)(res, login.message, login.data, 200);
        }
        return (0, response_1.sendErrorResponse)(req, res, login.message, {}, 400);
    }
    catch (err) {
        return (0, response_1.sendErrorResponse)(req, res, "UNKNOWN_ERROR", {}, 500);
    }
});
exports.login = login;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, user_service_1.updateUser)(req.user, req.body);
        if (user.status) {
            return (0, response_1.sendSuccessResponse)(res, user.message, user.data, 201);
        }
        return (0, response_1.sendErrorResponse)(req, res, user.message, {}, 400);
    }
    catch (err) {
        console.log("kkk");
        return (0, response_1.sendErrorResponse)(req, res, "UNKNOWN_ERROR", {}, 500);
    }
});
exports.update = update;
//# sourceMappingURL=user.controller.js.map