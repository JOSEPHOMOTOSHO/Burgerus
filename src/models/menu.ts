import { Schema, model, Model } from "mongoose"

const menuSchema: Schema = new Schema({
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

}, { timestamps: true })

const menu: Model<any> = model('menu', menuSchema)

export default menu