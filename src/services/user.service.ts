import User from "../models/user"
import obj from "../utilities/interface"
import { generateResponse } from "../utilities/response"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const findUserByEmail = async (email: string): Promise<any> => {
    return await User.findOne({ email })
}

const findUserById = async (id: string): Promise<any> => {
    return await User.findById(id)
}


const findUserByIdAndUpdate = async (id: string, payload: obj): Promise<any> => {
    return await User.findByIdAndUpdate(id, payload, {new: true})
}

const generateHashedPassword = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


const compareHashedPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}

const generateJWT = (user: obj): string => {
    return jwt.sign({
        _id: user._id,
        email: user.email
    },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d'
        }
    );
};

const registerUser = async (payload: obj): Promise<any> => {
    const existingUser = await findUserByEmail(payload.email.toLowerCase())
    console.log("rrrrrrrr",existingUser)
    if (existingUser) {
        return generateResponse(false, "EMAIL_DUPLICATE", {})
    }
    let password = generateHashedPassword(payload.password);
    const user = await new User({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email.toLowerCase(),
        password: password,
        address: payload.address
    }).save()
    user.set('password', undefined)
    let token = generateJWT(user)
    if (!user) {
        return generateResponse(false, "REGISTER_FAILED", {})
    }
    console.log("vbee")
    return generateResponse(true, "REGISTER_SUCCESS", { user, token })
}

const loginUser = async (payload: obj) => {
    const existingUser = await findUserByEmail(payload.email);
    if (!existingUser) {
        return generateResponse(false, "USER_NOT_FOUND", {})
    }
    const isPasswordCorrect = compareHashedPassword(payload.password, existingUser.password)
    if (!isPasswordCorrect) {
        return generateResponse(false, "INVALID_CREDENTIALS", {})
    }
    existingUser.set("password", undefined)
    let token = generateJWT(existingUser)
    return generateResponse(true, "LOGIN_SUCCESS", { token, user: existingUser })
}

const verifyToken = async (token:string): Promise<any> => {
    if(!token){
        return generateResponse(false, "INVALID_TOKEN", {});
    }
    try{
        let decoded:any= jwt.verify(token, process.env.JWT_SECRET as string);
        let user = await findUserById(decoded._id);
        if(!user){
            return generateResponse(false, "INVALID_TOKEN", {})
        }
        return generateResponse(true, "", user)
    }catch(error){
        return generateResponse(false, "INVALID_TOKEN", {})
    }
}

const updateUser = async (user:obj, payload:obj):Promise<any> => {
    if(payload.password){
        payload.password = generateHashedPassword(payload.password);
    }

    if(payload.email && payload.email.toLowerCase() === user.email.toString()){
        let existingUser = await findUserByEmail(payload.email.toLowerCase());
        if(existingUser){
            return generateResponse(false,"EMAIL_DUPLICATE",{})
        }
        payload.email = payload.email.toLowerCase()
    }

    let updateExistingUser = await findUserByIdAndUpdate(user._id,payload);
    if(!updateExistingUser){
        return generateResponse(false,"USER_NOT_FOUND",{})
    }
    updateExistingUser.set('password',undefined)
    return generateResponse(true,"UPDATE_SUCCESS",{user:updateExistingUser})
}

export {
    registerUser,
    loginUser,
    verifyToken,
    updateUser
}
/*To resgister a user
//finduserByEmail
*/