// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Venya Chowdhery",
  role: "AI / ML Engineer",
  location: "Dubai, UAE",
  tagline:
    "I build systems that learn from messy real-world data — anomaly detection on fleet telemetry, retrieval-augmented agents, and automations that quietly remove busywork.",
  about: [
    "I'm a Computer Science graduate from BITS Pilani, Dubai Campus, with a minor in Data Science. Most of my work sits where machine learning meets operations: taking noisy sensor streams, documents, or audio and turning them into something a team can act on.",
    "Right now I'm an AI intern at NEXA Digital Marketing, shipping chatbots, voicebots and n8n workflows for clients. Before that I spent six months at Tenderd building an anomaly-detection pipeline for construction-fleet telemetry.",
  ],
  email: "venyachowdhery@gmail.com",
  linkedin: "https://www.linkedin.com/in/venya-chowdhery-b588b0292",
  github: "https://github.com/venya10",
};

export const experience = [
  {
    company: "NEXA Digital Marketing",
    role: "Artificial Intelligence Intern",
    period: "Jul 2026 — Present",
    points: [
      "Built and deployed AI-powered chatbots and voicebots on the Chipp platform, designing conversational workflows tailored to each client.",
      "Developed an automated employee expense-reimbursement system in Python that ties together Slack, Google Sheets, Google Drive and email.",
      "Built n8n workflow automations connecting apps and services to cut manual work across internal operations.",
    ],
  },
  {
    company: "Tenderd",
    role: "Artificial Intelligence Intern",
    period: "Jan 2026 — Jul 2026",
    points: [
      "Built an end-to-end ML pipeline on telemetry sensor data (extraction, EDA, feature engineering), using Isolation Forest and autoencoders to detect sensor malfunctions across fleets.",
      "Engineered rule-based detection for loose sensors and data-exhaustion events to catch connectivity failures early.",
      "Automated PPE-detection labelling by plugging a custom YOLOv11-nano model into Label Studio's ML backend.",
      "Worked with engineering and ops teams on validation and QA so anomaly flags stayed reliable across fleet equipment.",
    ],
  },
  {
    company: "Oasis Investment, Al Shirawi Group",
    role: "Digital Solutions Intern",
    period: "Jun 2024 — Aug 2024",
    points: [
      "Improved the GUI of an internal Angular supplier-registration portal: form usability, validation and visual consistency.",
      "Built pages for a Streamlit intern-management portal covering tracking, task assignment and progress reporting.",
      "Drafted a PR-FAQ for ConferEase, a proposed conference-room booking app: target users, value proposition and roadmap.",
    ],
  },
];

export const projects = [
  {
    title: "Agentic Research Assistant",
    tags: ["RAG", "LLMs", "Python"],
    description:
      "A multi-agent RAG system that breaks complex questions into sub-tasks, retrieves the relevant context, and composes grounded, multi-step answers.",
    detail:
      "Covers ingestion, chunking, embeddings, semantic vector retrieval, and an evidence-validation step that cuts down hallucinations.",
  },
  {
    title: "SummarEase",
    tags: ["Generative AI", "NLP", "Streamlit"],
    description:
      "Speech-to-text and summarization for long-form audio: meetings, lectures and interviews.",
    detail:
      "Whisper for transcription, BART for context-aware summaries, and a LLaMA 3.3 chatbot for follow-up Q&A, served as a real-time Streamlit app.",
    link: "https://github.com/venya10/Speech-to-Text-Summarizer",
  },
  {
    title: "Air Quality Prediction",
    tags: ["ANFIS", "Python", "MATLAB"],
    description:
      "An adaptive neuro-fuzzy inference system that predicts AQI from multi-pollutant sensor readings.",
    detail:
      "Lag and moving-average features for time-series modelling; beat a Random Forest baseline.",
    stat: { value: "0.93", label: "R²" },
  },
  {
    title: "Used Car Price Prediction",
    tags: ["XGBoost", "scikit-learn", "Power BI"],
    description:
      "An end-to-end pipeline that predicts used-car prices in the Dubai market.",
    detail:
      "Tuned XGBoost, Linear Regression and Random Forest models, with Power BI dashboards for pricing and depreciation insights.",
  },
];

export const skills = {
  "Machine learning": [
    "Anomaly detection",
    "Deep learning",
    "Computer vision (YOLO)",
    "NLP",
    "RAG & LLM agents",
    "Time series",
  ],
  "Languages": ["Python", "C++", "C", "Java", "SQL", "HTML"],
  "Tools": ["scikit-learn", "n8n", "Streamlit", "Label Studio", "Power BI", "MATLAB", "Angular", "Git"],
};

export const education = [
  {
    school: "BITS Pilani, Dubai Campus",
    degree: "B.E. Computer Science, Minor in Data Science",
    detail: "CGPA 8.5 / 10",
    period: "2022 — 2026",
  },
  {
    school: "The Indian High School, Dubai",
    degree: "Senior Secondary (CBSE)",
    detail: "Class XII 91.5% · Class X 93.6%",
    period: "2018 — 2022",
  },
];

export const certifications = [
  "Introduction to C++ — Coding Ninjas",
  "Data Structures in C++ — Coding Ninjas",
  "Artificial Intelligence — Teachnook",
];
