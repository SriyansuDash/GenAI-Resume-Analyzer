import { useState } from "react";
import { useNavigate } from "react-router";
import "../style/interview.scss";
import AuthLayout from '../../../features/auth/components/AuthLayout';

const MOCK_REPORT = {
  title: "Backend Developer (Node.js)",
  matchScore: 88,
  technicalQuestions: [
    {
      question:
        "Explain the Node.js Event Loop and how it handles asynchronous I/O operations.",
      intention:
        "To assess the candidate's deep understanding of the Node.js runtime environment, libuv thread pool, and non-blocking I/O execution.",
      answer:
        "Cover the 6 phases of the Event Loop (timers, pending callbacks, idle/prepare, poll, check, close callbacks). Contrast microtasks (process.nextTick, Promises) with macrotasks (setTimeout, setImmediate) and explain how libuv offloads heavy file/network operations.",
    },
    {
      question:
        "How do you prevent JWT token replay attacks after a user logs out?",
      intention:
        "To evaluate practical API security knowledge and stateless vs. stateful token invalidation strategies.",
      answer:
        "Explain Token Blacklisting using a high-throughput in-memory store like Redis (with TTL matching token expiry) or MongoDB, combined with short-lived access tokens and HTTP-only secure cookies.",
    },
    {
      question:
        "How would you optimize a slow MongoDB aggregation pipeline on a collection with 10M+ documents?",
      intention:
        "To test database indexing strategy, query profiling, and schema design skills.",
      answer:
        "Place $match and $sort stages at the very beginning of the pipeline to utilize compound indexes, use covered queries ($project only necessary fields early), and inspect execution stats with .explain('executionStats').",
    },
  ],
  behavioralQuestions: [
    {
      question:
        "Describe a time when you had to optimize a critical piece of backend code under a tight deadline.",
      intention:
        "To evaluate systematic debugging, performance profiling under pressure, and business impact awareness.",
      answer:
        "Use the STAR method: describe the latency bottleneck, how you isolated the root cause using logs/profilers, the caching or indexing fix implemented, and the measurable drop in response time.",
    },
    {
      question:
        "Tell me about a technical disagreement you had with a teammate during an architecture migration.",
      intention:
        "To assess collaboration, communication, and objective engineering trade-off analysis.",
      answer:
        "Focus on data-driven decision making (benchmarking, maintainability, team velocity) rather than personal preference, and highlight how you aligned on the final design.",
    },
  ],
  skillGaps: [
    { skill: "Message Queues (Kafka / RabbitMQ)", severity: "high" },
    { skill: "Advanced Docker & Multi-stage Builds", severity: "medium" },
    { skill: "Distributed Systems & Microservices", severity: "medium" },
    { skill: "Production-level Redis Caching", severity: "low" },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "Node.js Internals & Streams",
      tasks: [
        "Deep dive into Event Loop phases, process.nextTick, and microtask queues.",
        "Build a custom readable/writable stream pipeline with backpressure handling.",
        "Review cluster module and worker threads for CPU-bound tasks.",
      ],
    },
    {
      day: 2,
      focus: "MongoDB Indexing & Aggregation Mastery",
      tasks: [
        "Practice multi-stage aggregation pipelines ($lookup, $unwind,$group).",
        "Analyze query plans using explain() and design ESR (Equality, Sort, Range) compound indexes.",
        "Review Mongoose schema validation and middleware hooks.",
      ],
    },
    {
      day: 3,
      focus: "Message Queues & Distributed Caching",
      tasks: [
        "Set up a producer/consumer workflow using BullMQ or RabbitMQ with Node.js.",
        "Implement Redis cache-aside pattern and JWT token blacklisting with TTL.",
        "Design rate-limiting middleware for public REST endpoints.",
      ],
    },
    {
      day: 4,
      focus: "System Design & Behavioral Mock Prep",
      tasks: [
        "Structure STAR stories around API optimization and production incident resolution.",
        "Containerize a full-stack Node + React app using multi-stage Dockerfiles.",
      ],
    },
  ],
};

const QuestionAccordion = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

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
  const [activeTab, setActiveTab] = useState("technical");
  const report = MOCK_REPORT;

  return (
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
                <span className="count">{report.technicalQuestions.length}</span>
              </button>

              <button
                className={`tab-btn ${activeTab === "behavioral" ? "active" : ""}`}
                onClick={() => setActiveTab("behavioral")}
              >
                <span>Behavioral Questions</span>
                <span className="count">{report.behavioralQuestions.length}</span>
              </button>

              <button
                className={`tab-btn ${activeTab === "roadmap" ? "active" : ""}`}
                onClick={() => setActiveTab("roadmap")}
              >
                <span>Preparation Road Map</span>
                <span className="count">{report.preparationPlan.length}d</span>
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
                  Tailored questions targeting gaps and core competencies between your resume and the JD.
                </p>
              </header>
              <div className="questions-list">
                {report.technicalQuestions.map((item, idx) => (
                  <QuestionAccordion key={idx} item={item} index={idx} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "behavioral" && (
            <div className="content-section">
              <header className="section-header">
                <h2>Behavioral &amp; Leadership Questions</h2>
                <p>
                  Scenario-based questions to evaluate engineering ownership, teamwork, and adaptability.
                </p>
              </header>
              <div className="questions-list">
                {report.behavioralQuestions.map((item, idx) => (
                  <QuestionAccordion key={idx} item={item} index={idx} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "roadmap" && (
            <div className="content-section">
              <header className="section-header">
                <h2>Day-by-Day Preparation Road Map</h2>
                <p>
                  Follow this structured study plan to bridge your skill gaps before interview day.
                </p>
              </header>
              <div className="roadmap-timeline">
                {report.preparationPlan.map((dayPlan) => (
                  <div key={dayPlan.day} className="timeline-card">
                    <div className="day-badge">Day {dayPlan.day}</div>
                    <div className="day-details">
                      <h3>{dayPlan.focus}</h3>
                      <ul>
                        {dayPlan.tasks.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
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
                  <span className="score-status">Strong Match</span>
                </div>
              </div>
            </div>
          </div>

          <div className="insight-card gaps-card">
            <div className="card-header">
              <span className="card-label">Identified Skill Gaps</span>
              <span className="gap-count">{report.skillGaps.length} Areas</span>
            </div>
            <p className="card-sub">
              Prioritize high-severity topics first during your preparation.
            </p>
            <div className="skill-tags">
              {report.skillGaps.map((gap, index) => (
                <div key={index} className={`skill-tag severity-${gap.severity}`}>
                  <span className="dot"></span>
                  <span className="skill-name">{gap.skill}</span>
                  <span className="severity-badge">{gap.severity}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </AuthLayout>
  );
};

export default Interview;