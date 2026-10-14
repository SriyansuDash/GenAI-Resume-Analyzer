import app from './src/app.js'
import connectDB from './src/db/db.js';
import generateInterviewReport from './src/services/ai.service.js'

connectDB();
generateInterviewReport({resume , jobDescription , selfDescription});

app.listen((3000) , ()=>{
    console.log(("Server is running on port 3000"))
});
