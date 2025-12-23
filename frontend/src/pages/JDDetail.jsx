import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Roadmap from "@/components/Roadmap";

export default function JDDetail() {
  const { id } = useParams();
  const [jd, setJD] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/jd/${id}`)
      .then((res) => setJD(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading JD...</p>;
  }

  if (!jd) {
    return <p className="p-6">JD not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{jd.companyName}</h1>
        <p className="text-muted-foreground">{jd.jobTitle}</p>
      </div>

      {/* ROLE */}
      <section>
        <h2 className="text-xl font-semibold mb-1">
          Identified Role
        </h2>
        <p>{jd.identifiedRole || "Not detected"}</p>
      </section>

      {/* TECHNOLOGIES */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          Technologies
        </h2>

        <div className="flex flex-wrap gap-2">
          {jd.technologies?.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-primary/10 text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* SUMMARY */}
      <section>
        <h2 className="text-xl font-semibold mb-1">
          Job Description Summary
        </h2>
        <p className="text-muted-foreground">
          {jd.summary}
        </p>
      </section>

      {/* 🚀 ROADMAP (THIS IS THE IMPORTANT PART) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Learning Roadmap
        </h2>

        <Roadmap tech={jd.technologies} />
      </section>
    </div>
  );
}
