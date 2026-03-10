import { useState, useEffect } from "react";
import { BookOpen, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import RESOURCES from "@/data/learningResources";

export default function Roadmap({ roadmap, jdId }) {
  // ── Progress tracking (localStorage per JD) ──────────────────────────────
  const storageKey = jdId ? `roadmap_progress_${jdId}` : null;

  const [completed, setCompleted] = useState(() => {
    if (!storageKey) return {};
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  const toggleTopic = (topic) => {
    setCompleted((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  if (!roadmap || roadmap.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No roadmap generated for this job description.
      </p>
    );
  }

  // ── Overall progress stats ────────────────────────────────────────────────
  const totalTopics = roadmap.reduce((acc, p) => acc + p.topics.length, 0);
  const doneTopics = roadmap.reduce(
    (acc, p) => acc + p.topics.filter((t) => completed[t]).length,
    0
  );
  const progressPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      {jdId && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              Your Progress
            </span>
            <span className="font-semibold text-primary">
              {doneTopics} / {totalTopics} topics
            </span>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">
            {progressPct}% complete
          </p>
        </div>
      )}

      {/* Phases */}
      {roadmap.map((phase, index) => {
        const phaseTotal = phase.topics.length;
        const phaseDone = phase.topics.filter((t) => completed[t]).length;

        return (
          <div key={index} className="border rounded-xl overflow-hidden">
            {/* Phase header */}
            <div className="flex items-center justify-between px-5 py-3 bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </div>
                <h3 className="text-sm font-semibold tracking-wide">
                  {phase.phase}
                </h3>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {phaseDone}/{phaseTotal}
              </span>
            </div>

            {/* Topics grid */}
            <div className="p-4 grid gap-3 sm:grid-cols-2">
              {phase.topics.map((topic) => {
                const isDone = !!completed[topic];
                const links = RESOURCES[topic] || null;

                return (
                  <div
                    key={topic}
                    className={`rounded-lg border p-3 transition-colors ${
                      isDone
                        ? "bg-primary/5 border-primary/30"
                        : "bg-background"
                    }`}
                  >
                    {/* Topic row */}
                    <div className="flex items-start gap-2 mb-2">
                      <button
                        onClick={() => toggleTopic(topic)}
                        className="mt-0.5 shrink-0 text-muted-foreground hover:text-primary transition-colors"
                        title={isDone ? "Mark as not done" : "Mark as done"}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>
                      <p
                        className={`font-medium capitalize text-sm leading-snug ${
                          isDone ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {topic}
                      </p>
                    </div>

                    {/* Resource links */}
                    {links ? (
                      <ul className="space-y-1 ml-6">
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
                      <p className="ml-6 text-xs text-muted-foreground flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3" />
                        Resources coming soon
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
