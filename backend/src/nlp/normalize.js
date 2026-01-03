export const normalizeText = (text = "") => {
  return text
    .toLowerCase()

    // common tech normalizations
    .replace(/node\.js/g, "node")
    .replace(/express\.js/g, "express")
    .replace(/react\.js/g, "react")
    .replace(/rest\s*apis?/g, "rest api")
    .replace(/mongo\s*db/g, "mongodb")

    // clean symbols
    .replace(/[^a-z0-9+#.\s]/g, " ")

    // normalize whitespace
    .replace(/\s+/g, " ")
    .trim();
};
