import mongoose from 'mongoose';

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: [true, "Skill is required"] },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],  
        required: [true, "Severity is required"]
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: [true, "Day number is required"] },
    focus: { type: String, required: [true, "Focus is required"] },
    tasks: [{ type: String }]
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: [true, "Job description is required"] },
    resume: { type: String, required: [true, "Resume is required"] },
    selfDescription: { type: String },
    matchScore: { type: Number, min: 0, max: 100 },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],  
    skillGaps: [skillGapSchema],                       
    preparationPlan: [preparationPlanSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: [true, "Title is required"] }
}, { timestamps: true });

const interviewReportModel = mongoose.model('interviewreport', interviewReportSchema);

export default interviewReportModel;