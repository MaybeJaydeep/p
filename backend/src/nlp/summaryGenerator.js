export const generateSummary = ({ role, companyName, skills = {} } = {}) => {
  const allSkills = Object.values(skills)
    .flat()
    .sort((a, b) => b.weight - a.weight);

  const topSkills = allSkills.slice(0, 3).map((s) => s.skill);
  const categoryCount = Object.keys(skills).length;
  const totalSkillCount = allSkills.length;

  const scopeWord =
    categoryCount >= 5
      ? "very broad"
      : categoryCount >= 3
      ? "broad"
      : categoryCount >= 2
      ? "focused"
      : "highly specialized";

  const skillPhrase =
    topSkills.length > 0
      ? topSkills.length === 1
        ? topSkills[0]
        : `${topSkills.slice(0, -1).join(", ")} and ${topSkills.at(-1)}`
      : "technical skills";

  return (
    `This ${role || "technical"} role at ${companyName || "the company"} ` +
    `primarily requires expertise in ${skillPhrase}. ` +
    `The JD spans ${categoryCount} skill ${categoryCount === 1 ? "area" : "areas"} ` +
    `with ${totalSkillCount} identified ${totalSkillCount === 1 ? "skill" : "skills"} — ` +
    `indicating a ${scopeWord} scope of work. ` +
    `Use the personalized roadmap below to build targeted proficiency and maximize your placement chances.`
  );
};