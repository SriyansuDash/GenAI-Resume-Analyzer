import config from '../config/config.js';
import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token verification",
            errorName: error.name,
            errorMessage: error.message
        });
    }
}

export default authUser