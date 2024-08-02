import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export const checkAuth = async (req, res, next) => {
	try {
		const token = req.headers?.authorization?.split(" ")[1];
		if (!token) {
			return res.status(400).json({
				message: "Nguoi dung chua dang nhap!",
			});
		}
		const decode = verifyToken(token);
		if (!decode) {
			return res.status(400).json({
				message: "Token khong hop le!",
			});
		}
		const user = await User.findById(decode._id);
        if (!user) {
            return res.status(404).json({
                message: "Nguoi dung khong ton tai!",
            });
        }
        req.userId = user._id;
		next();
	} catch (error) {
		next(error);
	}
};
