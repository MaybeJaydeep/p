import { BookOpen, ExternalLink } from "lucide-react";
import RESOURCES from "@/data/learningResources";

export default function Roadmap({ roadmap }) {
  if (!roadmap || roadmap.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No roadmap generated for this job description.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {roadmap.map((phase, index) => (
        <div
          key={index}
          className="border rounded-xl p-5 bg-muted/30"
        >
          {/* Phase header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
              {index + 1}
            </div>
            <h3 className="text-base font-semibold tracking-wide">
              {phase.phase}
            </h3>
          </div>

          {/* Topics */}
          <div className="grid gap-3 sm:grid-cols-2">
            {phase.topics.map((topic) => {
              const links = RESOURCES[topic] || null;
              return (
                <div
                  key={topic}
                  className="bg-background rounded-lg p-3 border"
                >
                  <p className="font-medium capitalize text-sm mb-2">
                    {topic}
                  </p>

                  {links ? (
                    <ul className="space-y-1">
                      {links.map((r) => (
                        <li key={r.url}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3 shrink-0" />
                            {r.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3" />
                      Resources coming soon
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
