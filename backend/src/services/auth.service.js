import { createUser, findByEmail } from "../dao/user.dao.js";
import User from "../models/user.model.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";
import jwt from 'jsonwebtoken';


export const registerUser = async (username, email, password) => {
   const existingUser = await findByEmail(email)
    if (existingUser) throw new ConflictError("User Already Exists")
    const newUser = await createUser(username, email, password)

    const token = await signToken({id:newUser._id})
    // console.log(token)
    return { token, user: newUser }
}

export const loginUser = async (email, password) => {
    const user = await findByEmail(email)
    if (!user || user.password !== password) throw new ConflictError("Invalid Credentials")

    const token = await signToken({ id: user._id })
    return { token, user }
}