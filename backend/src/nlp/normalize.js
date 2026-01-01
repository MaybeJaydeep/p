export const normalizeText = (text = "") => {
  if (typeof text !== "string") {
    throw new Error("normalizeText expects a string");
  }

  return text
    .toLowerCase()
    .replace(/[^a-z0-9.+#\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};