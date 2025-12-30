import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Upload, Loader2 } from "lucide-react";
import api from "@/services/api";
import JDCard from "@/components/JDCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { error: showError } = useToast();
  const [jds, setJds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJDs = async () => {
      try {
        const res = await api.get("/jd/my");
        setJds(res.data);
      } catch (err) {
        showError("Failed to load job descriptions. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJDs();
  }, [showError]);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-xl p-5 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (jds.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-6">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-2">
            No Job Descriptions Yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Get started by uploading your first job description. We'll analyze it and create a personalized learning roadmap for you.
          </p>
          <Button onClick={() => navigate("/upload")} size="lg">
            <Upload className="mr-2 h-4 w-4" />
            Upload Your First JD
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Your Job Descriptions
          </h1>
          <p className="text-muted-foreground mt-1">
            {jds.length} {jds.length === 1 ? "job description" : "job descriptions"}
          </p>
        </div>
        <Button onClick={() => navigate("/upload")}>
          <Upload className="mr-2 h-4 w-4" />
          Upload JD
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {jds.map((jd, index) => (
          <motion.div
            key={jd._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <JDCard jd={jd} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
