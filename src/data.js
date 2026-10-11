// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Venya Chowdhery",
  handle: "venya",
  role: "AI / ML Engineer",
  location: "Dubai, UAE",
  tagline:
    "I build applied AI that ships: LLM assistants used by 44,600+ people, agentic automations that turn briefs into live campaigns, and anomaly detection on messy sensor data.",
  email: "venyachowdhery@gmail.com",
  linkedin: "https://www.linkedin.com/in/venya-chowdhery-b588b0292",
  github: "https://github.com/venya10",
  resume: `${import.meta.env.BASE_URL}Venya_Chowdhery_Resume.pdf`,
  status: "open to work",
};

// Shown in the `neofetch` card.
export const fetchInfo = [
  ["Role", "AI / ML Engineer"],
  ["Location", "Dubai, UAE (GST, UTC+4)"],
  ["Visa", "UAE Golden Visa"],
  ["Currently", "AI Intern @ NEXA Digital Marketing"],
  ["Education", "B.E. Computer Science, BITS Pilani Dubai"],
  ["Stack", "Python · LangGraph · FastAPI · Next.js"],
  ["ML", "LLM agents · RAG · anomaly detection · CV"],
  ["Shell", "curiosity --verbose"],
];

// Rendered as `git log --graph`. `hash` is just decoration.
export const experience = [
  {
    hash: "a3f9c21",
    head: true,
    company: "NEXA Digital Marketing",
    role: "Artificial Intelligence Intern",
    period: "Jul 2026 — present",
    points: [
      "Built and deployed customer-facing LLM chatbots and voicebots on WhatsApp for clients including Rove Hotels, Nest Hotels and Marjan, reaching 44,600+ unique users.",
      "Built a full-stack account intelligence hub (Next.js, TypeScript, PostgreSQL/Prisma, Claude API) that uses LLMs to extract action items from Slack, Gmail and Fireflies for human review, with per-account dashboards and automated security testing.",
      "Engineered an agentic n8n + LLM pipeline that turns client ad briefs into live Meta ad campaigns after client approval, plus reporting with 24-hour insights and 48-hour scale / adjust / kill recommendations.",
      "Delivered client-facing financial dashboards (HTML, JavaScript) with an embedded AI chatbot for natural-language access to performance data.",
      "Automated expense reimbursement across Slack, Sheets and Drive, cutting processing time by about 70%.",
    ],
  },
  {
    hash: "7be41d0",
    company: "Tenderd",
    role: "Artificial Intelligence Intern",
    period: "Jan 2026 — Jul 2026",
    points: [
      "Built an end-to-end ML pipeline on fleet telemetry (extraction, EDA, feature engineering) with Isolation Forest and autoencoder models to detect sensor malfunctions and equipment deviations.",
      "Engineered rule-based detectors for loose sensors and data-exhaustion events to catch connectivity failures and enable proactive maintenance.",
      "Automated PPE-detection labelling by integrating a custom YOLOv11-nano model into Label Studio's ML backend.",
      "Validated anomaly flags with engineering and operations teams through QA workflows before fleet-wide deployment.",
    ],
  },
  {
    hash: "1c0ffee",
    company: "Oasis Investment, Al Shirawi Group",
    role: "Digital Solutions Intern",
    period: "Jun 2024 — Aug 2024",
    points: [
      "Delivered GUI and UX improvements for an Angular supplier-registration portal.",
      "Built intern-tracking and progress-reporting pages for HR.",
      "Authored a product PR/FAQ for ConferEase, a proposed conference-room booking app.",
    ],
  },
];

// `slug` is the folder name shown in `ls projects/` and used by `open <slug>`.
export const projects = [
  {
    slug: "n8n-copilot",
    title: "n8n Copilot",
    stack: ["Python", "FastAPI", "Sentence-Transformers", "Chrome MV3", "GitHub Actions"],
    description:
      "A Chrome extension that suggests the next node while you build an n8n workflow. Rankings blend transition statistics mined from 494 real workflow templates with semantic search; the 90/10 blend was chosen by evaluation, not guesswork. Deployed on Render with CI.",
    metrics: ["Recall@5 54.7%", "Recall@10 70.1%", "1,547 held-out edges"],
    links: [["source", "https://github.com/venya10/n8n"]],
  },
  {
    slug: "agentic-research-assistant",
    title: "Agentic Research Assistant",
    stack: ["LangGraph", "Chroma", "Sentence-Transformers", "Streamlit"],
    description:
      "Planner, research, evidence, critic and writer agents orchestrated with LangGraph. It decomposes a question, retrieves evidence from your documents, marks each claim SUPPORTED / PARTIAL / UNSUPPORTED, and writes a cited report.",
    links: [["source", "https://github.com/venya10/agentic_research_assistant"]],
  },
  {
    slug: "samsung-mena-intel",
    title: "Samsung MENA Marketing Intelligence",
    stack: ["Python", "SQL", "Gemini", "HTML/JS"],
    description:
      "A case-study marketing intelligence system: data cleaning and modelling, cross-market efficiency benchmarking, an early-warning rules engine that compares each market with its peers, an executive dashboard, and an AI assistant that answers by running read-only SQL instead of guessing.",
    links: [
      ["live demo", "https://samsung-marketing-dashboard.onrender.com/"],
      ["source", "https://github.com/venya10/Samsung_casestudy"],
    ],
  },
  {
    slug: "ai-recruitment-screening",
    title: "AI Recruitment Screening Pipeline",
    stack: ["Python", "LLMs (Groq)", "human-in-the-loop"],
    description:
      "A staged LLM screening pipeline: generates a scoring rubric for human approval, scores candidates, audits the scores for bias and re-scores anonymised profiles when bias is flagged. Ranking stays blocked until the audit passes, and every LLM call is logged.",
    links: [["source", "https://github.com/venya10/assessment"]],
  },
  {
    slug: "summarease",
    title: "SummarEase",
    stack: ["Whisper", "BART", "Llama 3.3 70B", "Streamlit"],
    description:
      "Upload long-form audio, get a Whisper transcript and a BART summary, then ask questions about it with a Llama 3.3 chatbot.",
    links: [["source", "https://github.com/venya10/Speech-to-Text-Summarizer"]],
  },
  {
    slug: "aqi-prediction",
    title: "AQI Prediction",
    stack: ["ANFIS (MATLAB)", "Random Forest", "Python"],
    description:
      "Predicts the Air Quality Index for Indian cities from 29,531 daily pollution records, with lag and moving-average features. A neuro-fuzzy ANFIS model beat a Random Forest baseline.",
    metrics: ["ANFIS R² 0.938", "RMSE 26.7"],
    links: [["source", "https://github.com/venya10/AQI-Prediction"]],
  },
  {
    slug: "car-price-prediction",
    title: "Used Car Price Prediction",
    stack: ["XGBoost", "scikit-learn", "Power BI"],
    description:
      "Price prediction on 4,009 used-car listings with engineered features (horsepower, mileage per year, age) and a Power BI dashboard for price drivers.",
    metrics: ["XGBoost R² 0.83", "MAE ≈ $5.3k"],
    links: [["source", "https://github.com/venya10/Car-Price-Prediction-Visualization"]],
  },
];

export const skills = {
  "genai": ["RAG", "LangChain", "LangGraph", "AI agents", "multi-agent systems", "tool calling", "ChromaDB", "embeddings", "vector search"],
  "llmops": ["LLM APIs", "prompt engineering", "guardrails", "human-in-the-loop", "LLM evaluation", "LoRA"],
  "vision": ["image classification", "object detection (YOLO)", "segmentation", "ViT", "Google Earth Engine"],
  "ml": ["Python", "SQL", "PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "CNNs", "LSTM", "BERT", "autoencoders", "Java", "C++"],
  "full-stack": ["FastAPI", "REST APIs", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "Git", "CI/CD", "GCP", "n8n", "Power BI"],
};

export const education = [
  {
    school: "BITS Pilani, Dubai Campus",
    degree: "B.E. Computer Science, Minor in Data Science",
    detail: "CGPA 8.5 / 10",
    period: "Sep 2022 — Jul 2026",
  },
  {
    school: "The Indian High School, Dubai",
    degree: "Senior Secondary (CBSE)",
    detail: "Class XII 91.5% · Class X 93.6%",
    period: "Apr 2018 — Jun 2022",
  },
];

export const certifications = [
  "Introduction to C++ — Coding Ninjas",
  "Data Structures in C++ — Coding Ninjas",
  "Artificial Intelligence — Teachnook",
];

// First entry is the default.
export const themes = ["light", "dark", "dracula", "matrix", "amber"];
