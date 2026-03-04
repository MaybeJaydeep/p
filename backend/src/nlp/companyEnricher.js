/**
 * Enriches a company name with public data from Wikipedia's REST API.
 * No API key required. Falls back gracefully if the company is not found.
 */
export const enrichWithCompanyData = async (companyName) => {
  if (!companyName) return getFallback(companyName);

  try {
    const query = encodeURIComponent(companyName.trim());
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      return getFallback(companyName);
    }

    const data = await res.json();

    // Reject disambiguation pages or irrelevant articles
    if (data.type === "disambiguation") {
      return getFallback(companyName);
    }

    return {
      companyName,
      description: data.description || null,
      summary: data.extract || null,
      thumbnail: data.thumbnail?.source || null,
      wikiUrl: data.content_urls?.desktop?.page || null,
      source: "wikipedia",
    };
  } catch (err) {
    // AbortError = timed out, NetworkError = offline — both are fine to swallow
    console.warn(`[CompanyEnricher] Could not fetch data for "${companyName}":`, err.message);
    return getFallback(companyName);
  }
};

const getFallback = (companyName) => ({
  companyName,
  description: null,
  summary: null,
  thumbnail: null,
  wikiUrl: null,
  source: "fallback",
});
