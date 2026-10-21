import { createContext, useState } from "react";


export const InterviewContext = createContext();


export const InterviewProvider = ({childern}) =>{
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null)
    const [reports , setReports] = useState([])

    return(
        <InterviewContext.Provider value = {{loading , setLoading , report , setReport, reports , setReports  }}>
            {childern}
        </InterviewContext.Provider>
    )
}