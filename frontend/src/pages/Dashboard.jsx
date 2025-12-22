import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [jds, setJds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJDs = async () => {
      try {
        const res = await api.get("/jd/my");
        setJds(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJDs();
  }, []);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (jds.length === 0) {
    return (
      <p className="p-6 text-gray-600">
        No job descriptions uploaded yet.
      </p>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">
        Your Job Descriptions
      </h1>

      {jds.map((jd) => (
        <div
          key={jd._id}
          className="bg-white dark:bg-gray-800 p-5 rounded shadow"
        >
          <h2 className="text-xl font-semibold">
            {jd.companyName} — {jd.jobTitle}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Role Identified:
          </p>

          <p className="font-medium text-indigo-600">
            {jd.analysis?.role || "Not detected"}
          </p>

          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-1">
              Technologies:
            </p>

            <div className="flex flex-wrap gap-2">
              {jd.analysis?.technologies?.length > 0 ? (
                jd.analysis.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">
                  Not detected
                </span>
              )}
            </div>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
            {jd.analysis?.summary}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
