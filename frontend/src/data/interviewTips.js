export const INTERVIEW_TIPS = {
  "Frontend Developer": {
    rounds: ["DSA / Problem Solving", "Machine Coding", "System Design (UI)", "HR"],
    tips: [
      "Master JavaScript fundamentals — closures, event loop, prototypes, promises",
      "Be ready to build isolated UI components from scratch in a machine coding round",
      "Understand React rendering, hooks lifecycle, and reconciliation deeply",
      "Know CSS layout inside out — Flexbox, Grid, responsive design",
      "Prepare for performance optimization: lazy loading, code splitting, memoization",
    ],
  },
  "Backend Developer": {
    rounds: ["DSA / Problem Solving", "System Design", "Machine Coding", "HR"],
    tips: [
      "Know database indexing, query optimization, and transactions thoroughly",
      "Understand REST API design principles, idempotency, and status codes",
      "Be comfortable discussing microservices trade-offs vs monoliths",
      "Practice designing for scale — caching (Redis), load balancing, rate limiting",
      "Understand authentication patterns: JWT, OAuth 2.0, sessions",
    ],
  },
  "Full Stack Developer": {
    rounds: ["DSA / Problem Solving", "Machine Coding", "System Design", "HR"],
    tips: [
      "Be ready to build a complete feature end-to-end in the coding round",
      "Know when to use SQL vs NoSQL and be able to justify your choice",
      "Understand the full request lifecycle from browser to database",
      "Know state management on the frontend (Context, Redux, Zustand)",
      "Prepare deployment basics — Docker, CI/CD, cloud hosting",
    ],
  },
  "ML Engineer": {
    rounds: ["ML Fundamentals", "Coding (Python)", "System Design (ML)", "HR"],
    tips: [
      "Understand bias-variance tradeoff, overfitting, and regularization",
      "Be comfortable implementing ML algorithms from scratch",
      "Know MLOps — model versioning (MLflow), deployment, monitoring",
      "Handle imbalanced datasets and missing data confidently",
      "Be ready to explain your model's predictions in plain language",
    ],
  },
  "Data Scientist": {
    rounds: ["Statistics Round", "ML Concepts", "Case Study", "HR"],
    tips: [
      "Be strong in statistics — distributions, hypothesis testing, p-values",
      "Know EDA deeply — pandas, matplotlib for exploratory analysis",
      "Prepare business case studies on solving problems with data",
      "Understand A/B testing, experiment design, statistical significance",
      "Know SQL well — window functions, CTEs, aggregations",
    ],
  },
  "Data Engineer": {
    rounds: ["SQL / Data Modeling", "System Design", "Coding", "HR"],
    tips: [
      "Know ETL and ELT pipeline patterns — when to use each",
      "Be comfortable with big data tools — Spark, Kafka, Airflow, dbt",
      "Understand data warehouse concepts — star schema, OLAP vs OLTP",
      "Practice complex SQL — window functions, recursive CTEs, optimizations",
      "Design for data quality, idempotency, and pipeline reliability",
    ],
  },
  "DevOps Engineer": {
    rounds: ["Infrastructure Round", "Scripting / Automation", "System Design", "HR"],
    tips: [
      "Know Docker & Kubernetes deeply — pods, deployments, ingress",
      "Understand CI/CD pipeline design — GitHub Actions, GitLab CI, Jenkins",
      "Be comfortable with core cloud services (AWS/GCP/Azure)",
      "Know Linux administration, networking, and shell scripting",
      "Understand Infrastructure as Code — Terraform or Ansible",
    ],
  },
  "Mobile Developer": {
    rounds: ["Coding Round", "Platform-Specific Round", "System Design", "HR"],
    tips: [
      "Understand platform lifecycle — Activity (Android) / ViewController (iOS)",
      "Know mobile performance optimization — battery, memory, frame rate",
      "Be ready to build a small app feature from scratch",
      "Understand state management for mobile (ViewModel, Provider, Redux)",
      "Know app store publishing flows and distribution basics",
    ],
  },
  "QA Engineer": {
    rounds: ["Testing Strategy", "Automation Round", "Scenario Design", "HR"],
    tips: [
      "Demonstrate clear test case design for edge and negative cases",
      "Know the testing pyramid — unit, integration, E2E and when to apply each",
      "Be comfortable with Cypress, Playwright, or Selenium",
      "Know API testing with Postman or REST Assured",
      "Show understanding of shift-left testing and CI/CD integration",
    ],
  },
};
