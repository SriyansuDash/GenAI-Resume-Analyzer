import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./Reports.scss";
import AuthLayout from "../../../features/auth/components/AuthLayout";
import { useInterview } from "../hooks/useInterview";
import AppHeader from "../components/AppHeader";

const scoreClass = (score) =>
  score >= 75 ? "strong" : score >= 50 ? "good" : "low";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

const Reports = () => {
  const { reports, getReports } = useInterview();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getReports().finally(() => setLoaded(true));
    
  }, []);

  return (
    <div className="reports-with-header">
      <AppHeader />
      <AuthLayout>
        <main className="reports-page">
          <header className="reports-header">
            <h1>Interview Results</h1>
            <p>Every analysis you have generated, newest first.</p>
          </header>

          {!loaded ? (
            <p className="reports-state">Loading your reports...</p>
          ) : reports.length === 0 ? (
            <div className="reports-state empty">
              <p>You have no interview reports yet.</p>
              <Link to="/" className="reports-cta">
                Create your first analysis
              </Link>
            </div>
          ) : (
            <ul className="reports-list">
              {reports.map((report) => (
                <li key={report._id}>
                  <Link to={`/interview/${report._id}`} className="report-item">
                    <div className="report-main">
                      <span className="report-title">{report.title}</span>
                      <span className="report-date">{formatDate(report.createdAt)}</span>
                    </div>
                    <span className={`report-score ${scoreClass(report.matchScore)}`}>
                      {report.matchScore ?? 0}% match
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </main>
      </AuthLayout>
    </div>
  );
};

export default Reports;