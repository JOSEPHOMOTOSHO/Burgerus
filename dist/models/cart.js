"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    items: [
        {
            name: String,
            price: Number,
            shipping: Number,
            quantity: Number,
            menu: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'menu',
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        default: 0,
    },
    totalQuantity: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const Cart = (0, mongoose_1.model)('cart', cartSchema);
exports.default = Cart;
//# sourceMappingURL=cart.js.map