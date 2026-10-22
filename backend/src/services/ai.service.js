import { GoogleGenAI } from '@google/genai';
import * as z from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const interviewReportSchema = z.object({
    title: z.string().describe("The job title this interview report is for"),
    matchScore: z.number().describe("The match score between the candidate's resume and the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind the technical question"),
        answer: z.string().describe("The candidate's answer to the technical question"),
    })).describe("List of technical questions with intentions and answers"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The intention behind the behavioral question"),
        answer: z.string().describe("The candidate's answer to the behavioral question"),
    })).describe("List of behavioral questions with intentions and answers"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap"),
    })).describe("List of skill gaps identified from the resume and job description"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number of the preparation plan"),
        focus: z.string().describe("The focus area for that day"),
        tasks: z.array(z.string()).describe("List of tasks to complete that day"),
    })).describe("Day-by-day preparation plan to bridge skill gaps"),
});

const generateInterviewReport = async ({ resume, jobDescription, selfDescription }, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3.5-flash-lite',
                contents: `You are an expert technical interviewer. Analyze the resume, job description, and self description below.

STRICT RULES:
- Return ONLY a raw JSON object
- No markdown, no backticks, no explanation text
- Every field below is REQUIRED
- technicalQuestions must have EXACTLY 20 questions
- behavioralQuestions must have EXACTLY 10 questions
- Each question must be an OBJECT with question, intention, and answer fields — NOT a string
- skillGaps must be an array of OBJECTS with skill and severity fields — NOT strings
- preparationPlan must be an array of OBJECTS with day, focus, and tasks fields — NOT strings
- severity must be exactly "low", "medium", or "high" — never "mid" or any other value

Return exactly this structure:
{
  "title": "job title extracted from job description",
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "write the actual technical question here",
      "intention": "explain why the interviewer asks this",
      "answer": "explain how to answer this well"
    }
    ... 30 total technical questions
  ],
  "behavioralQuestions": [
    {
      "question": "write the actual behavioral question here",
      "intention": "explain why the interviewer asks this",
      "answer": "explain how to answer this well using STAR method"
    }
    ... 30 total behavioral questions
  ],
  "skillGaps": [
    {
      "skill": "name of missing skill",
      "severity": "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "topic to study on day 1",
      "tasks": ["specific task 1", "specific task 2", "specific task 3"]
    }
  ]
}

Resume: ${resume}
Job Description: ${jobDescription}
Self Description: ${selfDescription}

IMPORTANT: 
- technicalQuestions array must have exactly 20 items
- behavioralQuestions array must have exactly 10 items
- All arrays must contain OBJECTS not strings
- severity values must only be "low", "medium", or "high"`,
                config: {
                    responseMimeType: 'application/json',
                }
            });

            const parsedReport = response?.parsed ?? JSON.parse(response?.text || '{}');
            console.log("AI RESPONSE:", JSON.stringify(parsedReport, null, 2));
            return parsedReport;

        } catch (error) {
            const isLastAttempt = i === retries - 1;
            if (isLastAttempt || error?.status !== 503) throw error;
            console.log(`Gemini 503 — retrying in 3s (attempt ${i + 1}/${retries})`);
            await new Promise(res => setTimeout(res, 3000));
        }
    }
};

export default generateInterviewReport;