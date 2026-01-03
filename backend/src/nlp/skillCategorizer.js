import { SKILL_ONTOLOGY } from "./skillOntology.js";

/**
 * Converts flat skill frequencies into categorized skills
 */
export const categorizeSkills = (skillFrequencies = {}) => {
  const categorized = {};

  for (const category in SKILL_ONTOLOGY) {
    categorized[category] = [];
  }

  for (const [skill, count] of Object.entries(skillFrequencies)) {
    for (const category in SKILL_ONTOLOGY) {
      if (SKILL_ONTOLOGY[category].includes(skill)) {
        categorized[category].push({
          skill,
          weight: count,
        });
      }
    }
  }

  // remove empty categories
  Object.keys(categorized).forEach((category) => {
    if (categorized[category].length === 0) {
      delete categorized[category];
    }
  });

  return categorized;
};
