export const INTERVIEW_TIPS = {
  "Frontend Developer": {
    rounds: ["DSA / Problem Solving", "Machine Coding Round", "System Design (UI)", "HR Round"],
    tips: [
      "Master JavaScript fundamentals — closures, event loop, prototypes, promises",
      "Be ready to build isolated UI components from scratch in a machine coding round",
      "Understand React rendering, hooks lifecycle, and reconciliation deeply",
      "Know CSS layout inside out — Flexbox, Grid, responsive design",
      "Prepare for performance optimization: lazy loading, code splitting, memoization",
    ],
  },

  "Backend Developer": {
    rounds: ["DSA / Problem Solving", "System Design Round", "Machine Coding Round", "HR Round"],
    tips: [
      "Know database indexing, query optimization, and transactions thoroughly",
      "Understand REST API design principles, idempotency, and status codes",
      "Be comfortable discussing microservices trade-offs vs monoliths",
      "Practice designing for scale — caching (Redis), load balancing, rate limiting",
      "Understand authentication patterns: JWT, OAuth 2.0, sessions",
    ],
  },

  "Full Stack Developer": {
    rounds: ["DSA / Problem Solving", "Machine Coding Round", "System Design Round", "HR Round"],
    tips: [
      "Be ready to build a complete feature end-to-end in the coding round",
      "Know when to use SQL vs NoSQL and be able to justify your choice",
      "Understand the full request lifecycle from browser to database",
      "Know state management on the frontend (Context, Redux, Zustand)",
      "Prepare deployment basics — Docker, CI/CD, cloud hosting",
    ],
  },

  "ML Engineer": {
    rounds: ["ML Fundamentals Round", "Coding Round (Python)", "System Design (ML)", "HR Round"],
    tips: [
      "Understand bias-variance tradeoff, overfitting, and regularization",
      "Be comfortable implementing ML algorithms from scratch (logistic regression, k-means, etc.)",
      "Know how to handle imbalanced datasets and missing data",
      "Understand MLOps — model versioning (MLflow), deployment (BentoML, TorchServe), monitoring",
      "Be ready to explain your model's predictions in plain language",
    ],
  },

  "Data Scientist": {
    rounds: ["Statistics Round", "ML Concepts Round", "Case Study Round", "HR Round"],
    tips: [
      "Be strong in statistics — distributions, hypothesis testing, confidence intervals, p-values",
      "Know EDA deeply — pandas, matplotlib, seaborn for exploratory analysis",
      "Prepare business-oriented case studies — how would you use data to solve X?",
      "Understand A/B testing, experiment design, and statistical significance",
      "Know SQL well — window functions, CTEs, aggregations",
    ],
  },

  "Data Engineer": {
    rounds: ["SQL / Data Modeling Round", "System Design Round", "Coding Round", "HR Round"],
    tips: [
      "Know ETL and ELT pipeline patterns — when to use each",
      "Be comfortable with big data tools — Apache Spark, Kafka, Airflow, dbt",
      "Understand data warehouse concepts — star/snowflake schema, OLAP vs OLTP",
      "Practice complex SQL — window functions, recursive CTEs, optimizations",
      "Know how to design for data quality, idempotency, and pipeline reliability",
    ],
  },

  "DevOps Engineer": {
    rounds: ["Infrastructure Round", "Scripting / Automation Round", "System Design Round", "HR Round"],
    tips: [
      "Know Docker and Kubernetes deeply — pods, deployments, services, ingress",
      "Understand CI/CD pipeline design — GitHub Actions, GitLab CI, Jenkins",
      "Be comfortable with cloud provider IaaS (AWS/GCP/Azure) core services",
      "Know Linux system administration, networking basics, and shell scripting",
      "Understand Infrastructure as Code — Terraform or Ansible",
    ],
  },

  "Mobile Developer": {
    rounds: ["Coding Round", "Platform-Specific Round", "System Design Round", "HR Round"],
    tips: [
      "Understand platform lifecycle deeply — Activity (Android) / ViewController (iOS)",
      "Know mobile performance optimization — battery, memory, frame rate",
      "Be ready to build a small app feature in the coding round from scratch",
      "Understand state management approaches for mobile (ViewModel, Provider, Redux)",
      "Know app store publishing flows and distribution basics",
    ],
  },

  "QA Engineer": {
    rounds: ["Testing Strategy Round", "Automation Round", "Scenario Design Round", "HR Round"],
    tips: [
      "Demonstrate clear test case design for edge cases and negative scenarios",
      "Know the testing pyramid — unit, integration, E2E and when to apply each",
      "Be comfortable with at least one automation framework — Cypress, Playwright, or Selenium",
      "Know API testing with Postman or REST Assured",
      "Show understanding of shift-left testing and CI/CD integration",
    ],
  },
};
