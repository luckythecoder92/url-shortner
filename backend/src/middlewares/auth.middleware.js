import User from "../models/user.model.js";
import { verifyToken } from "../utils/helper.js";

const authMiddleware = async (req, res, next) => {    
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }   
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }   
};
export default authMiddleware;