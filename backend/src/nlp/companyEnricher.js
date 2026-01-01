export const enrichWithCompanyData = async (companyName, role) => {
  // Phase 2.5 (pluggable)
  return {
    companyName,
    roleInsights: [
      "Focus on system design basics",
      "Strong emphasis on problem solving",
      "Hands-on project experience expected"
    ],
    interviewRounds: ["DSA", "Machine Coding", "HR"]
  };
};
