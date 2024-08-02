import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;

export const verifyToken = (token) => {
	return jwt.verify(token, SECRET_CODE);
};

export const generateToken = (payload, expiresIn = "1d") => {
	return jwt.sign(payload, SECRET_CODE, {
		expiresIn: expiresIn,
	});
};