import { GoogleGenAI } from '@google/genai';
import * as z from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("The match score between the candidate's resume and the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind the technical question"),
        answer: z.string().describe("The candidate's answer to the technical question"),
    })).describe("A brief description of the candidate's performance during the interview"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The intention behind the behavioral question"),
        answer: z.string().describe("The candidate's answer to the behavioral question"),
    })).describe("A brief description of the candidate's performance during the interview"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap"),
    })).describe("A brief description of the candidate's skill gaps"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day of the preparation plan"),
        focus: z.string().describe("The focus of the preparation plan for that day"),
        tasks: z.array(z.string()).describe("List of tasks to be completed for that day"),
    })).describe("A brief description of the candidate's preparation plan for future interviews"),
});

const generateInterviewReport = async ({ resume, jobDescription, selfDescription }) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Generate a detailed interview report based on the following information:
        Resume: ${resume}
        Job Description: ${jobDescription}
        Self Description: ${selfDescription}
        `,
        config: {
            responseMimeType: 'application/json',
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    const parsedReport = response?.parsed ?? JSON.parse(response?.text || '{}');
    return parsedReport;
};

export default generateInterviewReport;