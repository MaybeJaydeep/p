const resources = {
  React: [
    { name: "React Official Docs", url: "https://react.dev" },
    { name: "FreeCodeCamp React", url: "https://freecodecamp.org" },
  ],
  Node: [
    { name: "Node.js Docs", url: "https://nodejs.org" },
  ],
  REST: [
    { name: "REST API Guide", url: "https://restfulapi.net" },
  ],
};

export default function Roadmap({ tech }) {
  if (!tech || tech.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No technologies detected for this role.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {tech.map((t) => (
        <div key={t} className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">{t}</h3>

          <ul className="list-disc ml-5 space-y-1 text-sm">
            {resources[t]?.map((r) => (
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
              <li className="text-muted-foreground">
                Resources coming soon
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
