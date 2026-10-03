import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import blockTokenModel from '../models/blackList.model.js';

export const register = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User Exist with this credential"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username, email, password: hash
        });

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, config.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token);

        res.status(201).json({
            message: "User created",
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to register user"
        });
    }
}

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized! Email not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, config.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Invalid Request"
            });
        } else {
            await blockTokenModel.create({ token });
        }

        res.clearCookie('token');

        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getMe = async (req, res) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const isTokenBlocked = await blockTokenModel.findOne({ token });

        if (isTokenBlocked) {
            return res.status(401).json({
                message: "Invalid Token"
            });
        }
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("GetMe Error:", error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}