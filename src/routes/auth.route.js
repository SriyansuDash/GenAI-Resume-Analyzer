import {Router} from 'express';
import * as authController from '../controllers/auth.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const authRoute = Router();

authRoute.post('/register', authController.register);

authRoute.get('/login',authController.login);

authRoute.get('/logout', authController.logout);

authRoute.get('/get-me' , authMiddleware, authController.getMe);
export default authRoute