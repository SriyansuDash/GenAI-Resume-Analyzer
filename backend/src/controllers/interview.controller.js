import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pdfparse = require('pdf-parse');
import generateInterviewReport from '../services/ai.service.js';
import interviewReportModel from '../models/interviewReport.model.js';

export const generateInterviewReportController = async (req, res) => {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({ message: 'Resume PDF is required' });
        }

        const resumeContent = await (new pdfparse.PDFParse(Uint8Array.from (resumeFile.buffer))).getText();
        const { selfDescription, jobDescription } = req.body;
        

        const interviewReportByAI = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        const interviewReport = new interviewReportModel({
            jobDescription,
            resume: resumeContent.text,
            selfDescription,
            matchScore: interviewReportByAI?.matchScore,
            technicalQuestions: interviewReportByAI?.technicalQuestions || [],
            behavioralQuestions: interviewReportByAI?.behavioralQuestions || [],
            skillGaps: interviewReportByAI?.skillGaps || [],
            preparationPlan: interviewReportByAI?.preparationPlan || [],
            user: req.user?.id
        });

        await interviewReport.save();

        return res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport: interviewReportByAI
        });
    } catch (error) {
        console.error('Generate interview report error:', error);
        return res.status(500).json({
            message: 'Unable to generate interview report',
            error: error.message
        });
    }
};

