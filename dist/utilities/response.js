"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = exports.sendSuccessResponse = exports.sendErrorResponse = exports.generateResponse = void 0;
const message_1 = __importDefault(require("./message"));
const sentry_1 = __importDefault(require("../sentry"));
const generateResponse = (status, message, data) => {
    return {
        status,
        message,
        data
    };
};
exports.generateResponse = generateResponse;
const sendSuccessResponse = (res, message, data, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        message: message_1.default.getMessage(message) || message,
        data
    });
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (req, res, message, data, statusCode = 400) => {
    sentry_1.default.captureException(new Error(`There was an error, here is the request payload ${JSON.stringify(req.body)}`));
    console.log("ebbebe");
    return res.status(statusCode).json({
        status: false,
        message: message_1.default.getMessage(message) || message,
        data
    });
};
exports.sendErrorResponse = sendErrorResponse;
const handleValidationError = (req, validatedData, res) => {
    const message = validatedData.error.details[0].message;
    console.log(message);
    return sendErrorResponse(req, res, message, {}, 400);
};
exports.handleValidationError = handleValidationError;
//# sourceMappingURL=response.js.map