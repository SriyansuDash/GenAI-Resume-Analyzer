import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { generateInterviewReportController } from '../controllers/interview.controller.js';
import upload from '../middlewares/file.middleware.js';
import * as interviewController from '../controllers/interview.controller.js';

const interviewRouter = express.Router();

interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController);

interviewRouter.get("/report/:interviewId" , authMiddleware , interviewController.getInterviewReportByIdController);

interviewRouter.get("/all" , authMiddleware , interviewController.getAllInterviewReportsController);

export default interviewRouter;