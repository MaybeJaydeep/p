export const generateSummary = ({ role, companyName } = {}) => {
  return `This job description aligns with a ${role} role at ${companyName || "the company"}.
The role emphasizes technical fundamentals and hands-on experience.
Targeted, structured preparation will improve placement chances.`;
};