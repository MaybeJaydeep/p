import { BookOpen } from "lucide-react";

/**
 * Optional resource mapping (can expand later)
 */
const RESOURCES = {
  "data structures": [
    { name: "Striver DSA Sheet", url: "https://takeuforward.org" },
    { name: "GeeksforGeeks DSA", url: "https://geeksforgeeks.org" },
  ],
  algorithms: [
    { name: "CP-Algorithms", url: "https://cp-algorithms.com" },
  ],
  react: [
    { name: "React Official Docs", url: "https://react.dev" },
    { name: "FreeCodeCamp React", url: "https://freecodecamp.org" },
  ],
  node: [
    { name: "Node.js Docs", url: "https://nodejs.org" },
  ],
  express: [
    { name: "Express Docs", url: "https://expressjs.com" },
  ],
  mongodb: [
    { name: "MongoDB University", url: "https://university.mongodb.com" },
  ],
};

export default function Roadmap({ roadmap }) {
  if (!roadmap || roadmap.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No roadmap generated for this job description.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {roadmap.map((phase, index) => (
        <div
          key={index}
          className="border rounded-lg p-5 bg-background"
        >
          {/* PHASE HEADER */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold">
              {phase.phase}
            </h3>
          </div>

          {/* TOPICS */}
          <div className="space-y-4">
            {phase.topics.map((topic) => (
              <div key={topic}>
                <p className="font-medium mb-1 capitalize">
                  {topic}
                </p>

                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {RESOURCES[topic]?.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline"
                      >
                        {r.name}
                      </a>
                    </li>
                  )) || (
                    <li className="text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      Resources coming soon
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
