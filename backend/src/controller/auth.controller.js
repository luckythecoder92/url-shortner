import { findByEmail } from "../dao/user.dao.js";
import User from "../models/user.model.js";
import { ConflictError } from "../utils/errorHandler.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import jwt from 'jsonwebtoken';
import { cookieOptions } from "../config/cookieOptions.js";

export const register_User = tryCatchWrapper(async (req, res) => {
    const { username, email, password } = req.body;

    const { token, user } = await registerUser(username, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
    });
});

export const login_User = tryCatchWrapper(async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)   
    const { token, user } = await loginUser(email, password);
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({
        success: true,
        message: "Login Successful",
        data: {
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
    });
});

export const logout_User = tryCatchWrapper(async (req, res) => {
    res.clearCookie("accessToken", cookieOptions);
    res.status(200).json({
        success: true,
    });

});

export const getCurrentUser = tryCatchWrapper(async (req, res) => {
    res.status(200).json({
        user: req.user});
});