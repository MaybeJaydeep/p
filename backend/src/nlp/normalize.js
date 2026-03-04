export const normalizeText = (text = "") => {
  return text
    .toLowerCase()

    // ── Framework / library normalizations ──────────────────────────────────
    .replace(/node\.js/g, "node")
    .replace(/express\.js/g, "express")
    .replace(/react\.js/g, "react")
    .replace(/next\.js/g, "next")
    .replace(/vue\.js/g, "vue")
    .replace(/nuxt\.js/g, "nuxt")
    .replace(/angular\.js|angularjs/g, "angular")
    .replace(/svelte\.js/g, "svelte")
    .replace(/nest\.js|nestjs/g, "nestjs")
    .replace(/fast\s*api/g, "fastapi")
    .replace(/spring\s*boot/g, "spring boot")
    .replace(/on\s*rails|ruby\s*on\s*rails/g, "rails")

    // ── Database normalizations ───────────────────────────────────────────
    .replace(/mongo\s*db/g, "mongodb")
    .replace(/postgre\s*sql|postgre/g, "postgresql")
    .replace(/dynamo\s*db/g, "dynamodb")
    .replace(/fire\s*base/g, "firebase")
    .replace(/elastic\s*search/g, "elasticsearch")
    .replace(/cock\s*roach/g, "cockroachdb")

    // ── Language normalizations ───────────────────────────────────────────
    .replace(/golang|go\s*lang/g, "go")
    .replace(/typescript/g, "typescript")
    .replace(/javascript/g, "javascript")

    // ── DevOps / Cloud normalizations ────────────────────────────────────
    .replace(/ci\/cd|ci-cd/g, "ci cd")
    .replace(/amazon\s*web\s*services/g, "aws")
    .replace(/google\s*cloud(\s*platform)?/g, "gcp")
    .replace(/github\s*actions/g, "github actions")
    .replace(/gitlab\s*ci/g, "gitlab ci")
    .replace(/cloud\s*formation/g, "cloudformation")

    // ── ML/AI normalizations ─────────────────────────────────────────────
    .replace(/scikit[\s-]learn|sklearn/g, "scikit learn")
    .replace(/hugging\s*face/g, "hugging face")
    .replace(/large\s*language\s*models?|llms?/g, "llm")
    .replace(/data\s*pipelines?/g, "data pipeline")
    .replace(/ml\s*ops|mlops/g, "mlops")
    .replace(/natural\s*language\s*processing/g, "nlp")
    .replace(/computer\s*vision/g, "computer vision")
    .replace(/deep\s*learning/g, "deep learning")
    .replace(/machine\s*learning/g, "machine learning")
    .replace(/neural\s*networks?/g, "neural networks")

    // ── API / Protocol normalizations ────────────────────────────────────
    .replace(/rest\s*ful\s*apis?|rest\s*apis?/g, "rest api")
    .replace(/graph\s*ql/g, "graphql")
    .replace(/web\s*sockets?/g, "websocket")
    .replace(/message\s*queues?/g, "rabbitmq")

    // ── OOP / Architecture normalizations ────────────────────────────────
    .replace(/object[\s-]oriented(\s*programming)?/g, "object oriented programming")
    .replace(/\boop\b/g, "object oriented programming")
    .replace(/design\s*patterns?/g, "design patterns")
    .replace(/test[\s-]driven(\s*development)?|tdd/g, "test driven development")
    .replace(/system\s*designs?/g, "system design")
    .replace(/data\s*structures?/g, "data structures")
    .replace(/micro\s*services?/g, "microservices")

    // ── Mobile normalizations ────────────────────────────────────────────
    .replace(/react[\s-]native/g, "react native")
    .replace(/jetpack\s*compose/g, "jetpack compose")

    // ── Styling normalizations ───────────────────────────────────────────
    .replace(/tailwind\s*(css)?/g, "tailwind")
    .replace(/material[\s-]ui|mui/g, "material ui")
    .replace(/chakra[\s-]ui/g, "chakra ui")
    .replace(/ant[\s-]design/g, "ant design")

    // ── Tool normalizations ───────────────────────────────────────────────
    .replace(/github\s*actions/g, "github actions")

    // ── Symbol cleanup (preserve: + # . spaces) ──────────────────────────
    .replace(/[^a-z0-9+#.\s]/g, " ")

    // ── Normalize whitespace ──────────────────────────────────────────────
    .replace(/\s+/g, " ")
    .trim();
};
