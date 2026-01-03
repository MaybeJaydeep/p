const escapeRegex = (string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const extractSkillsWithFrequency = (text, skillOntology) => {
  const frequencies = {};

  for (const category in skillOntology) {
    for (const skill of skillOntology[category]) {
      const escaped = escapeRegex(skill);
      const regex = new RegExp(escaped, "g"); // ❌ no word boundaries

      const matches = text.match(regex);
      if (matches) {
        frequencies[skill] = matches.length;
      }
    }
  }

  return frequencies;
};
