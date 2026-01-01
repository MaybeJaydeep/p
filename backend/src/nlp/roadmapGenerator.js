export const generateRoadmap = (skills) => {
  const roadmap = [];

  for (const category in skills) {
    if (skills[category].length) {
      roadmap.push({
        phase: category.toUpperCase(),
        topics: skills[category].map(s => s.skill)
      });
    }
  }

  return roadmap;
};
