import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const pdfparse = require('pdf-parse');
import generateInterviewReport from '../services/ai.service.js';
import interviewReportModel from '../models/interviewReport.model.js';

// Converts array of strings OR objects to correct question object shape
const toQuestionObjects = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr
        .filter(Boolean)
        .map(item =>
            typeof item === 'string'
                ? { question: item, intention: '', answer: '' }
                : item
        )
        .filter(item => item && item.question);
};

// Converts array of strings OR objects to correct skill gap shape
const toSkillGapObjects = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr
        .filter(Boolean)
        .map(item =>
            typeof item === 'string'
                ? { skill: item, severity: 'medium' }
                : item
        )
        .filter(item => item && item.skill);
};

// Converts array of strings OR objects to correct preparation plan shape
const toPlanObjects = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr
        .filter(Boolean)
        .map((item, index) =>
            typeof item === 'string'
                ? { day: index + 1, focus: item, tasks: [] }
                : item
        )
        .filter(item => item && item.day);
};

export const generateInterviewReportController = async (req, res) => {
    try {
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({ message: 'Resume PDF is required' });
        }

        const resumeContent = await (new pdfparse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText();
        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAI = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        // Log what AI returned so we can debug
        console.log("AI behavioralQuestions:", JSON.stringify(interviewReportByAI?.behavioralQuestions, null, 2));
        console.log("AI skillGaps:", JSON.stringify(interviewReportByAI?.skillGaps, null, 2));

        const interviewReport = new interviewReportModel({
            title: interviewReportByAI?.title || 'General Interview Report',
            jobDescription,
            resume: resumeContent.text,
            selfDescription,
            matchScore: interviewReportByAI?.matchScore || 0,
            technicalQuestions: toQuestionObjects(interviewReportByAI?.technicalQuestions),
            behavioralQuestions: toQuestionObjects(interviewReportByAI?.behavioralQuestions),
            skillGaps: toSkillGapObjects(interviewReportByAI?.skillGaps),
            preparationPlan: toPlanObjects(interviewReportByAI?.preparationPlan),
            user: req.user?.id
        });

        // Log what is being saved
        console.log("SAVING behavioralQuestions:", interviewReport.behavioralQuestions?.length);
        console.log("SAVING skillGaps:", interviewReport.skillGaps?.length);

        await interviewReport.save();

        return res.status(201).json({
            message: 'Interview report generated successfully',
            interviewReport
        });
    } catch (error) {
        console.error('Generate interview report error:', error);
        return res.status(500).json({
            message: 'Unable to generate interview report',
            error: error.message
        });
    }
};

export const getInterviewReportByIdController = async (req, res) => {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        console.log("FETCHED behavioralQuestions:", interviewReport.behavioralQuestions?.length);
        console.log("FETCHED skillGaps:", interviewReport.skillGaps?.length);

        res.status(200).json({
            message: "Interview report fetched",
            interviewReport
        });
    } catch (error) {
        console.error('getInterviewReportById error:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllInterviewReportsController = async (req, res) => {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        res.status(200).json({
            message: "All interview reports fetched",
            interviewReports
        });
    } catch (error) {
        console.error('getAllInterviewReports error:', error);
        res.status(500).json({ message: error.message });
    }
};