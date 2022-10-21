import { Schema, model, Model } from "mongoose";

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const User: Model<any> = model('user', userSchema)

export default User