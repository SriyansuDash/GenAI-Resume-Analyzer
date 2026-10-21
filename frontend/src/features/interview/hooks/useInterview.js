import {generateInterviewReport, getInterviewReportById , getAllInterviewReports} from '../services/interview.api'
import {useContext} from 'react';
import {interviewContext} from '../interview.context.jsx'

export const useInterview = () =>{
    const context = useContext(interviewContext);

    if(!context){
        throw new Error ('useInteriewContext must be in InterviewProvider');
    }

    const { loading , setLoading , report , setReport , reports , setReports } = context;
    
    const generateReport = async ({jobDescription , selfDescription , resumeFile }) => {
        setLoading(true);

        try{
            const response = await generateInterviewReport({jobDescription , selfDescription , resumeFile});
            setReport ( response.interviewReport );
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false)
        }
    };

    const getReportById = async (interviewId) =>{
        setLoading(true);
        try{
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const getReports = async () =>{
        setLoading(true);
        try{
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    };

    return (loading , report , generateReport , getReportById, getReports)
}
