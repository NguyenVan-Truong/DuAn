import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();
const {SECRET_CODE} = process.env;
export const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        if(!token){
            return res.status(401).json({message: "Bạn chưa đăng nhập"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_CODE);
        console.log(decoded)
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(404).json({message: "Bạn chưa đăng nhập"});
        }
        if(user.role !== "admin"){
            return res.status(403).json({message: "Bạn không có quyền truy cập"});
        }
        req.userId = user._id;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}