"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const menuSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        default: 0,
    },
    description: String,
}, { timestamps: true });
const menu = (0, mongoose_1.model)('menu', menuSchema);
exports.default = menu;
//# sourceMappingURL=menu.js.map