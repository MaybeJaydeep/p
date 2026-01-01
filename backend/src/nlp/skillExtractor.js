const escapeRegex = (string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const extractSkillsWithFrequency = (text, skills) => {
  const frequencies = {};

  for (const category in skills) {
    skills[category].forEach((skill) => {
      const escapedSkill = escapeRegex(skill);
      const regex = new RegExp(`\\b${escapedSkill}\\b`, "g");
      const matches = text.match(regex);

      if (matches) {
        frequencies[skill] = matches.length;
      }
    });
  }

  return frequencies;
};
