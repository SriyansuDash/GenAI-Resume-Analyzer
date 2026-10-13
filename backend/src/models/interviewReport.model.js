import mongoose, { mongo } from 'mongoose'

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type : String ,
        required:[true , "Question is required"]
    },
    intention:{
        type : String ,
        required: [true , "Intention is required"]
    },
    answer:{
        type: String,
        required : [true , "Answer is required"]
    }
}, {
    _id: false
});

const behavioralQuestionSchma = new mongoose.Schema({
    question:{
        type : String ,
        required : [true , "Question is required"]
    },
    intention:{
        type : String ,
        required: [true , "Intention is required"]
    },
    answer :{
        type: String ,
        required : [true , "Answer is required"]
    }
}, {
    _id:false
});

const skillGapSchama = new mongoose.Schema({
    skill :{
        type : String,
        required : [true , "Skills are required"]
    },
    severity:{
        type : String ,
        enum : ["low","mid","high"],
        required : [true , "Severity is required"]
    }
}, {
    _id : false
});

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type : Number,
        required : [true , "Day number is required"]
    },
    focus:{
        type: String,
        required: [true , "Focus is required"]
    },
    tasks:[{
        type : String , 
        required : [true , " Tasks is required"]
    }]
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required: [true , "Job description is required"]
    },
    resume :{
        type:String,
        required:[true , "Resume is required"]
    },
    selfDescription :{
        type: String
    },
    matchScore:{
        type: Number,
        min: 0 ,
        max: 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestion : [behavioralQuestionSchma],
    skillgaps : [skillGapSchama],
    preparationPlan: [preparationPlanSchema]
}, {
    timestamps: true
});

const interviewReportModel = mongoose.model('interviewreport' , interviewReportSchema);

export default interviewReportModel