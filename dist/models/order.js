"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            name: String,
            price: Number,
            shipping: Number,
            quantity: Number,
            menu: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "menu",
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        default: 0
    },
    config: Object,
    reference: String,
    transaction: Object,
    isPaid: {
        type: Boolean,
        dafault: false,
    },
    delivery: String,
}, { timestamps: true });
const order = (0, mongoose_1.model)('order', orderSchema);
exports.default = order;
//# sourceMappingURL=order.js.map