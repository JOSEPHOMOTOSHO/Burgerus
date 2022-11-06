import { Schema, model, Model } from 'mongoose';

const orderSchema: Schema = new Schema(
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
    totalShipping: {
      type: Number,
      default: 0,
    },
    config: Object,
    reference: String,
    transaction: Object,
    isPaid: {
      type: Boolean,
      dafault: false,
    },
    delivery: String,
  },
  { timestamps: true }
);

const Order: Model<any> = model('order', orderSchema);

export default Order;
