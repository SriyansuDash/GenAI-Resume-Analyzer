import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const authRoute = Router();

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login);
authRoute.post('/logout', authController.logout);
authRoute.get('/get-me', authMiddleware, authController.getMe);

export default authRoute