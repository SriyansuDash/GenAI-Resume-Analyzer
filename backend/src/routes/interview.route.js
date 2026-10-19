import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { generateInterviewReportController } from '../controllers/interview.controller.js';
import upload from '../middlewares/file.middleware.js';

const interviewRouter = express.Router();

interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController);

export default interviewRouter;