import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Upload, Search, X } from "lucide-react";
import api from "@/services/api";
import JDCard from "@/components/JDCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

const Dashboard = () => {
  const errorShownRef = useRef(false);
  const navigate = useNavigate();
  const { error: showError, success: showSuccess } = useToast();
  const [jds, setJds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchJDs = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/jd/my");
        setJds(res.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          return;
        }
        if (!errorShownRef.current) {
          showError("Failed to load job descriptions. Please try again.");
          errorShownRef.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJDs();
  }, [showError]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job description? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await api.delete(`/jd/${id}`);
      setJds((prev) => prev.filter((jd) => jd._id !== id));
      showSuccess("Job description deleted.");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter by company name or job title
  const filtered = jds.filter((jd) => {
    const q = search.toLowerCase();
    return (
      jd.companyName.toLowerCase().includes(q) ||
      jd.jobTitle.toLowerCase().includes(q) ||
      jd.role?.toLowerCase().includes(q)
    );
  });

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
            Get started by uploading your first job description. We'll analyze
            it and create a personalized learning roadmap for you.
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Job Descriptions</h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} of {jds.length}{" "}
            {jds.length === 1 ? "job description" : "job descriptions"}
          </p>
        </div>
        <Button onClick={() => navigate("/upload")}>
          <Upload className="mr-2 h-4 w-4" />
          Upload JD
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9 pr-9"
          placeholder="Search by company, title, or role…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-muted-foreground"
        >
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">No results for "{search}"</p>
          <p className="text-sm mt-1">Try a different company name, title, or role.</p>
        </motion.div>
      )}

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((jd, index) => (
          <motion.div
            key={jd._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className={deletingId === jd._id ? "opacity-50 pointer-events-none" : ""}
          >
            <JDCard jd={jd} onDelete={handleDelete} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
