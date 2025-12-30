import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileText, X, Loader2, CheckCircle2 } from "lucide-react";

import api from "@/services/api";
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
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  // ✅ Handle file validation
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    // Check file type
    if (
      selectedFile.type !== "application/pdf" &&
      selectedFile.type !== "text/plain"
    ) {
      setError("Only PDF or TXT files are allowed");
      showError("Only PDF or TXT files are allowed");
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      setError("File size must be less than 10MB");
      showError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  // ✅ Handle paste (Ctrl + V)
  useEffect(() => {
    const handlePaste = (e) => {
      const item = e.clipboardData?.files?.[0];
      if (item) handleFile(item);
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please upload a JD file");
      showError("Please upload a JD file");
      return;
    }

    if (!companyName.trim() || !jobTitle.trim()) {
      setError("Please fill in all fields");
      showError("Please fill in all fields");
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
          const percent = Math.round(
            (e.loaded * 100) / e.total
          );
          setProgress(percent);
        },
      });

      showSuccess("Job description uploaded successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Upload failed. Please try again.";
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          Upload Job Description
        </h1>
        <p className="text-muted-foreground mt-1">
          Drag, drop, or paste a JD to analyze the role and required skills
        </p>
      </div>

      {/* DROP ZONE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFile(e.dataTransfer.files[0]);
          }}
          className={`border-2 border-dashed rounded-2xl min-h-[300px]
            flex flex-col items-center justify-center text-center transition-all
            ${
              dragActive
                ? "border-primary bg-primary/10 scale-[1.02]"
                : "border-muted hover:border-primary/50"
            }`}
        >
          <input
            type="file"
            accept=".pdf,.txt"
            hidden
            id="fileInput"
            onChange={(e) =>
              handleFile(e.target.files[0])
            }
            disabled={loading}
          />

          {file ? (
            <div className="flex flex-col items-center gap-4 px-6">
              <div className="flex items-center gap-3 bg-muted rounded-lg px-4 py-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="text-lg font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                {!loading && (
                  <button
                    onClick={removeFile}
                    className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              {!loading && (
                <label
                  htmlFor="fileInput"
                  className="text-sm text-primary hover:underline cursor-pointer"
                >
                  Choose a different file
                </label>
              )}
            </div>
          ) : (
            <label
              htmlFor="fileInput"
              className="cursor-pointer px-6 flex flex-col items-center gap-3"
            >
              <div className="rounded-full bg-muted p-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  Drag & drop your JD here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse • or paste (Ctrl + V)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports PDF and TXT files up to 10MB
                </p>
              </div>
            </label>
          )}
        </div>
      </motion.div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3"
      >
        {error && (
          <p className="text-red-500 md:col-span-3">
            {error}
          </p>
        )}

        <div className="space-y-1">
          <Label>Company Name</Label>
          <Input
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)
            }
            placeholder="Google"
            required
          />
        </div>

        <div className="space-y-1">
          <Label>Job Title</Label>
          <Input
            value={jobTitle}
            onChange={(e) =>
              setJobTitle(e.target.value)
            }
            placeholder="Software Engineer"
            required
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
              Uploading... {progress}%
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
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload JD
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadJD;
