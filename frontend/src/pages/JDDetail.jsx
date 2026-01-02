import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Briefcase,
  Code,
  FileText,
  AlertCircle,
} from "lucide-react";
import api from "@/services/api";
import Roadmap from "@/components/Roadmap";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

export default function JDDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error: showError } = useToast();

  const [jd, setJD] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJD = async () => {
      try {
        const res = await api.get(`/jd/${id}`);
        setJD(res.data);
      } catch (err) {
        setError("Failed to load job description");
        showError("Failed to load job description. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJD();
  }, [id, showError]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !jd) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Job Description Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The job description you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/")}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 🔹 Phase-2 NLP data
  const role = jd.analysis?.role;
  const skillsByCategory = jd.analysis?.skills || {};
  const roadmap = jd.analysis?.roadmap || [];
  const summary = jd.analysis?.summary;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-1"
          >
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">{jd.companyName}</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Briefcase className="h-4 w-4" />
            <p>{jd.jobTitle}</p>
          </motion.div>
        </div>
      </div>

      {/* ROLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Identified Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              {role || "Not detected"}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* SKILLS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Required Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.keys(skillsByCategory).length > 0 ? (
              Object.entries(skillsByCategory).map(([category, skills]) =>
                skills.length > 0 ? (
                  <div key={category}>
                    <p className="text-sm font-semibold uppercase text-muted-foreground mb-2">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s) => (
                        <span
                          key={s.skill}
                          className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium border border-primary/20"
                        >
                          {s.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <p className="text-muted-foreground">
                No skills detected
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* SUMMARY */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                JD Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {summary}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* ROADMAP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Preparation Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <Roadmap roadmap={roadmap} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
