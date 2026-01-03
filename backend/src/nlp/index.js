import { normalizeText } from "./normalize.js";
import { extractSkillsWithFrequency } from "./skillExtractor.js";
import { categorizeSkills } from "./skillCategorizer.js";
import { inferRole } from "./roleInferencer.js";
import { generateRoadmap } from "./roadmapGenerator.js";
import { generateSummary } from "./summaryGenerator.js";
import { SKILL_ONTOLOGY } from "./skillOntology.js";

const analyzeJD = ({ text, companyName }) => {
  // 1️⃣ Normalize text
  const normalizedText = normalizeText(text);

  // 2️⃣ Extract skill frequencies
  const skillFrequencies = extractSkillsWithFrequency(
    normalizedText,
    SKILL_ONTOLOGY
  );

  // 3️⃣ Categorize skills
  const skills = categorizeSkills(skillFrequencies);

  // 4️⃣ Infer role
  const role = inferRole(skills);

  // 5️⃣ Generate roadmap
  const roadmap = generateRoadmap(skills, role);

  // 6️⃣ Generate summary
  const summary = generateSummary({ role, companyName });

  // 🔍 TEMP DEBUG LOG (SAFE NOW)
  console.log("🧠 NLP OUTPUT", {
    skills,
    roadmap
  });

  return {
    role,
    skills,
    roadmap,
    summary
  };
};

export default analyzeJD;
