import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "../style/Interview.scss";
import AuthLayout from "../../../features/auth/components/AuthLayout";
import { useInterview } from "../hooks/useInterview";
import AppHeader from "../components/AppHeader";


const QuestionAccordion = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  if (!item || !item.question) return null; 

  return (
    <div className={`q-card ${isOpen ? "open" : ""}`}>
      <button className="q-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="q-title-wrap">
          <span className="q-index">Q{index + 1}</span>
          <h3>{item.question}</h3>
        </div>
        <span className="chevron">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="q-body">
          <div className="info-block intention">
            <span className="block-label">Interviewer Intention</span>
            <p>{item.intention}</p>
          </div>
          <div className="info-block answer">
            <span className="block-label">How to Structure Your Answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};


const Interview = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const [activeTab, setActiveTab] = useState("technical");

  const { report, loading, getReportById } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <div className="interview-with-header">
        <AppHeader />
        <AuthLayout>
          <main className="interview-dashboard">
            <h1>Loading your interview plan...</h1>
          </main>
        </AuthLayout>
      </div>
    );
  }


  const technicalQuestions = (report.technicalQuestions ?? []).filter(
    (item) => item && item.question
  );
  const behavioralQuestions = (report.behavioralQuestions ?? []).filter(
    (item) => item && item.question
  );
  const preparationPlan = (report.preparationPlan ?? []).filter(
    (item) => item && item.day
  );
  const skillGaps = (report.skillGaps ?? []).filter(
    (item) => item && item.skill
  );

  const matchLabel =
    report.matchScore >= 75
      ? "Strong Match"
      : report.matchScore >= 50
      ? "Good Match"
      : "Needs Work";

  return (
    <div className="interview-with-header">
      <AppHeader />
      <AuthLayout>
        <main className="interview-dashboard">
          <aside className="interview-nav">
            <div className="nav-content">
              <button className="back-btn" onClick={() => navigate("/")}>
                ← New Analysis
              </button>

              <div className="role-box">
                <span className="role-tag">Target Role</span>
                <h2>{report.title}</h2>
              </div>

              <nav className="tab-list">
                <button
                  className={`tab-btn ${activeTab === "technical" ? "active" : ""}`}
                  onClick={() => setActiveTab("technical")}
                >
                  <span>Technical Questions</span>
                  <span className="count">{technicalQuestions.length}</span>
                </button>

                <button
                  className={`tab-btn ${activeTab === "behavioral" ? "active" : ""}`}
                  onClick={() => setActiveTab("behavioral")}
                >
                  <span>Behavioral Questions</span>
                  <span className="count">{behavioralQuestions.length}</span>
                </button>

                <button
                  className={`tab-btn ${activeTab === "roadmap" ? "active" : ""}`}
                  onClick={() => setActiveTab("roadmap")}
                >
                  <span>Preparation Road Map</span>
                  <span className="count">{preparationPlan.length}d</span>
                </button>
              </nav>
            </div>
          </aside>

          <section className="interview-main">
            {activeTab === "technical" && (
              <div className="content-section">
                <header className="section-header">
                  <h2>Technical Interview Questions</h2>
                  <p>
                    Tailored questions targeting gaps and core competencies
                    between your resume and the JD.
                  </p>
                </header>
                <div className="questions-list">
                  {technicalQuestions.length > 0 ? (
                    technicalQuestions.map((item, idx) => (
                      <QuestionAccordion key={idx} item={item} index={idx} />
                    ))
                  ) : (
                    <p>No technical questions available for this report.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "behavioral" && (
              <div className="content-section">
                <header className="section-header">
                  <h2>Behavioral &amp; Leadership Questions</h2>
                  <p>
                    Scenario-based questions to evaluate engineering ownership,
                    teamwork, and adaptability.
                  </p>
                </header>
                <div className="questions-list">
                  {behavioralQuestions.length > 0 ? (
                    behavioralQuestions.map((item, idx) => (
                      <QuestionAccordion key={idx} item={item} index={idx} />
                    ))
                  ) : (
                    <p>No behavioral questions available for this report.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="content-section">
                <header className="section-header">
                  <h2>Day-by-Day Preparation Road Map</h2>
                  <p>
                    Follow this structured study plan to bridge your skill gaps
                    before interview day.
                  </p>
                </header>
                <div className="roadmap-timeline">
                  {preparationPlan.length > 0 ? (
                    preparationPlan.map((dayPlan) => (
                      <div key={dayPlan.day} className="timeline-card">
                        <div className="day-badge">Day {dayPlan.day}</div>
                        <div className="day-details">
                          <h3>{dayPlan.focus}</h3>
                          <ul>
                            {(dayPlan.tasks ?? []).filter(Boolean).map((task, i) => (
                              <li key={i}>{task}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No preparation plan available for this report.</p>
                  )}
                </div>
              </div>
            )}
          </section>

          <aside className="interview-insights">
            <div className="insight-card score-card">
              <span className="card-label">Resume vs. JD Match Score</span>
              <div className="score-ring-wrap">
                <div
                  className="score-ring"
                  style={{ "--score": `${report.matchScore}%` }}
                >
                  <div className="score-inner">
                    <span className="score-value">{report.matchScore}%</span>
                    <span className="score-status">{matchLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="insight-card gaps-card">
              <div className="card-header">
                <span className="card-label">Identified Skill Gaps</span>
                <span className="gap-count">{skillGaps.length} Areas</span>
              </div>
              <p className="card-sub">
                Prioritize high-severity topics first during your preparation.
              </p>
              <div className="skill-tags">
                {skillGaps.length > 0 ? (
                  skillGaps.map((gap, index) => (
                    <div key={index} className={`skill-tag severity-${gap.severity}`}>
                      <span className="dot"></span>
                      <span className="skill-name">{gap.skill}</span>
                      <span className="severity-badge">{gap.severity}</span>
                    </div>
                  ))
                ) : (
                  <p>No skill gaps identified.</p>
                )}
              </div>
            </div>
          </aside>
        </main>
      </AuthLayout>
    </div>
  );
};

export default Interview;