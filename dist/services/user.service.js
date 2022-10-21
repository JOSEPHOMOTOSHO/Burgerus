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
exports.updateUser = exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const response_1 = require("../utilities/response");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ email });
});
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findById(id);
});
const findUserByIdAndUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(id, payload, { new: true });
});
const generateHashedPassword = (password) => {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
};
const compareHashedPassword = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
const generateJWT = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield findUserByEmail(payload.email.toLowerCase());
    console.log("rrrrrrrr", existingUser);
    if (existingUser) {
        return (0, response_1.generateResponse)(false, "EMAIL_DUPLICATE", {});
    }
    let password = generateHashedPassword(payload.password);
    const user = yield new user_1.default({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email.toLowerCase(),
        password: password,
        address: payload.address
    }).save();
    user.set('password', undefined);
    let token = generateJWT(user);
    if (!user) {
        return (0, response_1.generateResponse)(false, "REGISTER_FAILED", {});
    }
    console.log("vbee");
    return (0, response_1.generateResponse)(true, "REGISTER_SUCCESS", { user, token });
});
exports.registerUser = registerUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield findUserByEmail(payload.email);
    if (!existingUser) {
        return (0, response_1.generateResponse)(false, "USER_NOT_FOUND", {});
    }
    const isPasswordCorrect = compareHashedPassword(payload.password, existingUser.password);
    if (!isPasswordCorrect) {
        return (0, response_1.generateResponse)(false, "INVALID_CREDENTIALS", {});
    }
    existingUser.set("password", undefined);
    let token = generateJWT(existingUser);
    return (0, response_1.generateResponse)(true, "LOGIN_SUCCESS", { token, user: existingUser });
});
exports.loginUser = loginUser;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return (0, response_1.generateResponse)(false, "INVALID_TOKEN", {});
    }
    try {
        let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let user = yield findUserById(decoded._id);
        if (!user) {
            return (0, response_1.generateResponse)(false, "INVALID_TOKEN", {});
        }
        return (0, response_1.generateResponse)(true, "", user);
    }
    catch (error) {
        return (0, response_1.generateResponse)(false, "INVALID_TOKEN", {});
    }
});
exports.verifyToken = verifyToken;
const updateUser = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        payload.password = generateHashedPassword(payload.password);
    }
    if (payload.email && payload.email.toLowerCase() === user.email.toString()) {
        let existingUser = yield findUserByEmail(payload.email.toLowerCase());
        if (existingUser) {
            return (0, response_1.generateResponse)(false, "EMAIL_DUPLICATE", {});
        }
        payload.email = payload.email.toLowerCase();
    }
    let updateExistingUser = yield findUserByIdAndUpdate(user._id, payload);
    if (!updateExistingUser) {
        return (0, response_1.generateResponse)(false, "USER_NOT_FOUND", {});
    }
    updateExistingUser.set('password', undefined);
    return (0, response_1.generateResponse)(true, "UPDATE_SUCCESS", { user: updateExistingUser });
});
exports.updateUser = updateUser;
/*To resgister a user
//finduserByEmail
*/ 
//# sourceMappingURL=user.service.js.map