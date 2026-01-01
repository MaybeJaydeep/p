import { normalizeText } from "./normalize.js";
import { extractSkillsWithFrequency } from "./skillExtractor.js";
import { categorizeSkills } from "./skillOntology.js";
import { inferRole } from "./roleInferencer.js";
import { generateRoadmap } from "./roadmapGenerator.js";
import { enrichWithCompanyData } from "./companyEnricher.js";
import { generateSummary } from "./summaryGenerator.js";
import { SKILLS } from "../data/skills.js";

export const analyzeJD = async ({ text, companyName }) => {
  const cleanText = normalizeText(text);

  const skillFreq = extractSkillsWithFrequency(cleanText, SKILLS);
  const categorizedSkills = categorizeSkills(skillFreq, SKILLS);

  const role = inferRole(categorizedSkills);
  const roadmap = generateRoadmap(categorizedSkills);

  const enrichment = await enrichWithCompanyData(companyName, role);
  const summary = generateSummary(role, companyName);

  return {
    role,
    skills: categorizedSkills,
    roadmap,
    enrichment,
    summary
  };
};
