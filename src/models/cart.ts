import { Schema, model, Model } from 'mongoose';

const cartSchema: Schema = new Schema(
    {
        customer: {
            type: Schema.Types.ObjectId,
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
                    type: Schema.Types.ObjectId,
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
    },
    { timestamps: true }
);

const Cart: Model<any> = model('cart', cartSchema);

export default Cart;
