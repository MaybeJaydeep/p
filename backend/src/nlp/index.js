import { normalizeText } from "./normalize.js";
import { extractSkillsWithFrequency } from "./skillExtractor.js";
import { categorizeSkills } from "./skillCategorizer.js";
import { inferRole } from "./roleInferencer.js";
import { generateRoadmap } from "./roadmapGenerator.js";
import { generateSummary } from "./summaryGenerator.js";
import { SKILL_ONTOLOGY } from "./skillOntology.js";
import { INTERVIEW_TIPS } from "../data/interviewTips.js";

/**
 * Pure NLP pipeline — synchronous, no external calls.
 * Company enrichment (Wikipedia) is handled in the controller.
 */
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

  // 5️⃣ Generate roadmap (sorted by weight + phase order)
  const roadmap = generateRoadmap(skills);

  // 6️⃣ Generate dynamic summary using role + skills
  const summary = generateSummary({ role, companyName, skills });

  // 7️⃣ Attach interview tips for inferred role
  const interviewTips = INTERVIEW_TIPS[role] || null;

  return {
    role,
    skills,
    roadmap,
    summary,
    interviewTips,
  };
};

export default analyzeJD;
