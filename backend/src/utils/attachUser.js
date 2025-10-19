import { findById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attatchUser = async(req, res, next) => {
    const token  = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if(!token) return next();
    try{
        const decoded = verifyToken(token)
        const user = await findById(decoded.id)
        // console.log(user, "this one");
        if(!user) return next()
        req.user = user
        
        next();
    }catch(error){
        console.log(error);
        next();
    }

}