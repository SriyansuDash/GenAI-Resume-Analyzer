import {Router} from 'express';
import * as authController from '../controllers/auth.controller.js'

const authRoute = Router();

authRoute.post('/register', authController.register);

authRoute.get('/login',authController.login);

export default authRoute