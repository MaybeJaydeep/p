// Canonical phase order (beginner-friendly → advanced)
const PHASE_ORDER = [
  "fundamentals",
  "languages",
  "frontend",
  "backend",
  "database",
  "mobile",
  "testing",
  "devops",
  "ml_ai",
  "tools",
];

const PHASE_LABELS = {
  fundamentals: "Fundamentals",
  languages: "Programming Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  mobile: "Mobile",
  testing: "Testing",
  devops: "DevOps & Cloud",
  ml_ai: "Machine Learning & AI",
  tools: "Tools & Workflow",
};

export const generateRoadmap = (skills) => {
  const roadmap = [];

  const sortedCategories = Object.keys(skills).sort((a, b) => {
    const ai = PHASE_ORDER.indexOf(a);
    const bi = PHASE_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  for (const category of sortedCategories) {
    const categorySkills = skills[category];
    if (categorySkills && categorySkills.length) {
      // Sort topics by frequency/weight descending
      const sortedTopics = [...categorySkills]
        .sort((a, b) => b.weight - a.weight)
        .map((s) => s.skill);

      roadmap.push({
        phase: PHASE_LABELS[category] || category.toUpperCase(),
        topics: sortedTopics,
      });
    }
  }

  return roadmap;
};
