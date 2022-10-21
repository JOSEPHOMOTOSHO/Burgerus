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
exports.verifyAuthentication = exports.validateLoginPayload = exports.validateRegisterPayload = void 0;
const joi_1 = __importDefault(require("joi"));
const response_1 = require("../utilities/response");
const user_service_1 = require("../services/user.service");
const registerPayloadValidation = (payload) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        address: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }).required();
    return schema.validate(payload, { allowUnknown: true });
};
const loginPayloadValidation = (payload) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }).required();
    return schema.validate(payload, { allowUnknown: true });
};
const validateRegisterPayload = (req, res, next) => {
    const validated = registerPayloadValidation(req.body);
    console.log("kdkndk");
    if (validated.error) {
        return (0, response_1.handleValidationError)(req, validated, res);
    }
    return next();
};
exports.validateRegisterPayload = validateRegisterPayload;
const validateLoginPayload = (req, res, next) => {
    const validated = loginPayloadValidation(req.body);
    if (validated.error) {
        return (0, response_1.handleValidationError)(req, validated, res);
    }
    return next();
};
exports.validateLoginPayload = validateLoginPayload;
//verifyAuthentication
//verifyToken
const verifyAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    if (!token) {
        return (0, response_1.sendErrorResponse)(req, res, "TOKEN_ERROR", {}, 401);
    }
    let verified = yield (0, user_service_1.verifyToken)(token.split(" ")[1]);
    if (!verified.status) {
        return (0, response_1.sendErrorResponse)(req, res, verified.message, {}, 401);
    }
    req.user = verified.data;
    return next();
});
exports.verifyAuthentication = verifyAuthentication;
//# sourceMappingURL=user.validations.js.map