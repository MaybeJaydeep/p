export const categorizeSkills = (skillFreq, skillOntology) => {
  const categorized = {};

  for (const category in skillOntology) {
    categorized[category] = [];
    skillOntology[category].forEach(skill => {
      if (skillFreq[skill]) {
        categorized[category].push({
          skill,
          weight: skillFreq[skill]
        });
      }
    });
  }

  return categorized;
};