// backend/src/utils/jdAnalyzer.js

const TECH_KEYWORDS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node",
  "express",
  "mongodb",
  "mysql",
  "postgres",
  "sql",
  "python",
  "java",
  "c++",
  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "git",
  "linux",
  "rest",
  "api",
  "html",
  "css"
];

export const analyzeJD = (text) => {
  const lowerText = text.toLowerCase();

  // Detect technologies
  const technologies = TECH_KEYWORDS.filter((tech) =>
    lowerText.includes(tech)
  );

  // Detect role
  let role = "Software Engineer";

  if (lowerText.includes("data scientist") || lowerText.includes("data science")) {
    role = "Data Scientist";
  } else if (lowerText.includes("data analyst")) {
    role = "Data Analyst";
  } else if (lowerText.includes("frontend")) {
    role = "Frontend Developer";
  } else if (lowerText.includes("backend")) {
    role = "Backend Developer";
  } else if (lowerText.includes("full stack") || lowerText.includes("fullstack")) {
    role = "Full Stack Developer";
  } else if (lowerText.includes("devops")) {
    role = "DevOps Engineer";
  }

  // Simple summary
  const summary = `This role is primarily focused on working as a ${role}. 
Key technologies expected include ${technologies.length > 0 ? technologies.join(", ") : "general software development tools"}. 
The candidate will be involved in building, maintaining, and improving production-ready systems.`;

  return {
    role,
    technologies,
    summary
  };
};
