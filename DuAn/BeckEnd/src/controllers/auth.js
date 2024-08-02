import { userSchema } from "../../validate/authValidate.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendEmail } from './../utils/email.js';
import { hashPassword } from './../utils/password.js';
import { errorMessages, successMessages } from "../utils/message.js";

dotenv.config();
const { SECRET_CODE } = process.env;

export const signUp = async (req, res) => {
    try {
        const output = userSchema.validate(req.body, { abortEarly: false });
        if (output.error) {
            return res.status(400).json({ message: output.error.details.map((i) => i.message).join(", ") });
        }
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exist" });
        }

        const hashedPassword = await hashPassword(req.body.password);
        const newUser = await User.create({ ...req.body, password: hashedPassword });
        newUser.password = undefined;
        return res.status(201).json({ data: newUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const output = userSchema.validate(req.body, { abortEarly: false });
        if (output.error) {
            return res.status(400).json({ message: output.error.details.map((i) => i.message).join(", ") });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Email chua co dang ky" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password is incorrect" });
        }
        const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE);
        user.password = undefined;
        return res.status(200).json({ message: "Dang Nhap thanh cong", user, accessToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: errorMessages.USER_NOT_FOUND,
            });
        }

        const newPassword = Math.random().toString(36).slice(-8);
        const hashPass = await hashPassword(newPassword);
        if (!hashPass) {
            return res.status(500).json({
                message: errorMessages?.HASH_PASSWORD_ERROR,
            });
        }

        user.password = hashPass;
        await user.save();

        const emailSubject = "Password Reset in Node.js App by TruongHayHo";
        const emailText = `Your new password is: ${newPassword}`;
        await sendEmail(email, emailSubject, emailText);

        return res.status(200).json({
            message: successMessages?.RESET_PASSWORD_SUCCESS,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUser = async (req, res) => {
    try {
        const data = await User.find({});
        if (!data) return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "User not found" });
        return res.status(201).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).json({ message: "Update not successful User" });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "Delete not successful User" });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
