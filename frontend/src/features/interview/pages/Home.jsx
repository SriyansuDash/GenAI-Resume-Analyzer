import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import "../style/home.scss";
import AuthLayout from '../../../features/auth/components/AuthLayout';

const Home = () => {
  const navigate = useNavigate();
  const resumeInputRef = useRef(null);

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();

    navigate("/interview/demo-report-id");
  };

  return (
    <main className="home-page">
      <AuthLayout>
        <header className="page-header">
          <div className="badge">
            <span className="pulse-dot"></span>
            AI-Powered Career Intelligence
          </div>
          <h1>
            Architect Your Winning <span className="gradient-text">Interview Strategy</span>
          </h1>
          <p>
            Upload your resume and target job description. Our Gemini AI engine analyzes skill
            gaps, predicts high-probability questions, and builds a tailored day-by-day prep roadmap.
          </p>
        </header>


        <section className="interview-card">
          <div className="interview-input-group">

            <div className="panel left-panel">
              <div className="panel-header">
                <div className="title-wrap">
                  <span className="step-num">01</span>
                  <label htmlFor="jobDescription">Target Job Description</label>
                </div>
                <span className="badge-req">Required</span>
              </div>
              <p className="panel-subtext">
                Paste the full job posting including responsibilities, tech stack, and qualifications.
              </p>
              <div className="textarea-wrapper">
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="e.g. Position: Senior Backend Engineer (Node.js)&#10;Responsibilities:&#10;- Design scalable microservices and REST APIs...&#10;- Optimize MongoDB aggregations and Redis caching..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <span className="char-count">{jobDescription.length} chars</span>
              </div>
            </div>


            <div className="panel right-panel">
              <div className="input-group">
                <div className="panel-header">
                  <div className="title-wrap">
                    <span className="step-num">02</span>
                    <p>Upload Resume</p>
                  </div>
                  <small className="highlight">
                    Use Resume &amp; Self Description together for best results
                  </small>
                </div>

                <label htmlFor="resume" className={`file-dropzone ${selectedFile ? "has-file" : ""}`}>
                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    name="resume"
                    id="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <div className="dropzone-content">
                    <div className="icon-circle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    {selectedFile ? (
                      <div className="file-info">
                        <span className="file-name">{selectedFile.name}</span>
                        <span className="file-meta">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Ready
                        </span>
                      </div>
                    ) : (
                      <div className="file-info">
                        <span className="upload-cta">Click to upload your Resume</span>
                        <span className="file-meta">PDF format only (Max 3MB)</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>


              <div className="input-group expand-group">
                <div className="panel-header">
                  <div className="title-wrap">
                    <span className="step-num">03</span>
                    <label htmlFor="selfDescription">Self Description &amp; Context</label>
                  </div>
                  <span className="badge-opt">Recommended</span>
                </div>
                <div className="textarea-wrapper">
                  <textarea
                    id="selfDescription"
                    name="selfDescription"
                    placeholder="Briefly describe your current role, key architectural achievements, or specific areas you want to emphasize..."
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                  />
                </div>
              </div>


              <button
                type="button"
                onClick={handleGenerateReport}
                className="button primary-button generate-btn"
              >
                <svg
                  className="sparkle-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                </svg>
                Generate My Interview Strategy
              </button>
            </div>
          </div>
        </section>

        <footer className="page-footer">
          <span>Structured JSON Output • Powered by Google Gemini 2.5 Flash</span>
        </footer>
      </AuthLayout>
    </main>
  );
};

export default Home;