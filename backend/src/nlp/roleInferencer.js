import { ROLE_PROFILES } from "../data/roles.js";

export const inferRole = (categorizedSkills) => {
  const scores = {};

  for (const role in ROLE_PROFILES) {
    let score = 0;

    for (const category in categorizedSkills) {
      const skillScore =
        categorizedSkills[category]?.reduce((a, s) => a + s.weight, 0) || 0;

      score += (ROLE_PROFILES[role][category] || 0) * skillScore;
    }

    scores[role] = score;
  }

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0][0];
};
