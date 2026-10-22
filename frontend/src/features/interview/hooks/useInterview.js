import { generateInterviewReport, getInterviewReportById, getAllInterviewReports } from '../services/interview.api'
import { useContext } from 'react';
import { InterviewContext } from '../interview.context.jsx'

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error('useInteriewContext must be in InterviewProvider');
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
            return response.interviewReport;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, report, reports, generateReport, getReportById, getReports };
}
