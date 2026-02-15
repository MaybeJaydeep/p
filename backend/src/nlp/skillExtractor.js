const escapeRegex = (string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const extractSkillsWithFrequency = (text, skillOntology) => {
  const frequencies = {};

  for (const category in skillOntology) {
    for (const skill of skillOntology[category]) {
      const escaped = escapeRegex(skill);
      // allow flexible whitespace inside multi-word skills and use word boundaries
      const pattern = "\\b" + escaped.replace(/\\s+/g, "\\\\s+") + "\\b";
      const regex = new RegExp(pattern, "gi");

      const matches = text.match(regex);
      if (matches) {
        frequencies[skill] = matches.length;
      }
    }
  }

  return frequencies;
};
