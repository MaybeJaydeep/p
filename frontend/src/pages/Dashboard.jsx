import { useEffect, useState } from "react";
import api from "@/services/api";
import JDCard from "@/components/JDCard";

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
    return (
      <div className="p-8 text-muted-foreground">
        Loading your job descriptions…
      </div>
    );
  }

  if (jds.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">
          No Job Descriptions Yet
        </h2>
        <p className="text-muted-foreground">
          Upload a JD to see role insights and required technologies.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Your Job Descriptions
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jds.map((jd) => (
          <JDCard key={jd._id} jd={jd} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
