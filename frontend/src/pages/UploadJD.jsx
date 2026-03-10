import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";

import api from "@/services/api";
import FileDropzone from "@/components/FileDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";

const UploadJD = () => {
  const navigate = useNavigate();
  const { success: showSuccess, error: showError } = useToast();

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  // ── Handle paste (Ctrl + V) ────────────────────────────────────────────
  useEffect(() => {
    const handlePaste = (e) => {
      const item = e.clipboardData?.files?.[0];
      if (item) handleFileError(null) || setFile(item); // validate inline
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleFileError = (msg) => {
    if (msg) {
      setError(msg);
      showError(msg);
    }
  };

  const handleFileSelect = (selected) => {
    setFile(selected);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      const msg = "Please upload a JD file";
      setError(msg);
      showError(msg);
      return;
    }

    if (!companyName.trim() || !jobTitle.trim()) {
      const msg = "Please fill in all fields";
      setError(msg);
      showError(msg);
      return;
    }

    const formData = new FormData();
    formData.append("companyName", companyName.trim());
    formData.append("jobTitle", jobTitle.trim());
    formData.append("file", file);

    try {
      setLoading(true);
      setProgress(0);

      await api.post("/jd/upload", formData, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      showSuccess("Job description uploaded and analyzed!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Upload failed. Please try again.";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Upload Job Description</h1>
        <p className="text-muted-foreground mt-1">
          Drag, drop, or paste a JD — we'll extract skills, infer the role,
          and build a personalized roadmap.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        {/* Dropzone */}
        <FileDropzone
          file={file}
          onFile={handleFileSelect}
          onError={handleFileError}
          disabled={loading}
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          {error && (
            <p className="text-red-500 text-sm md:col-span-3">{error}</p>
          )}

          <div className="space-y-1">
            <Label>Company Name</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Google"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label>Job Title</Label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Software Engineer"
              required
              disabled={loading}
            />
          </div>

          {loading && (
            <div className="md:col-span-3 space-y-2">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Uploading and analyzing… {progress}%
              </p>
            </div>
          )}

          <div className="flex items-end md:col-span-3">
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !file}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing JD…
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload &amp; Analyze
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadJD;
