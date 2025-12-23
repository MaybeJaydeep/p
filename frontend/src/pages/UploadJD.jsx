import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UploadJD = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0); // ✅ MOVED HERE

  // ✅ Handle file validation
  const handleFile = (selectedFile) => {
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "text/plain")
    ) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Only PDF or TXT files are allowed");
    }
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
      return;
    }

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
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

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
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
          className={`border-2 border-dashed rounded-2xl h-[300px]
            flex items-center justify-center text-center transition
            ${
              dragActive
                ? "border-primary bg-primary/10"
                : "border-muted"
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
          />

          <label
            htmlFor="fileInput"
            className="cursor-pointer px-6"
          >
            {file ? (
              <p className="text-lg font-medium">
                📄 {file.name}
              </p>
            ) : (
              <>
                <p className="text-lg font-medium">
                  Drag & drop your JD here
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse • or paste (Ctrl + V)
                </p>
              </>
            )}
          </label>
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
          <div className="w-full bg-muted rounded h-2 overflow-hidden md:col-span-3">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <div className="flex items-end md:col-span-3">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload JD"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadJD;
