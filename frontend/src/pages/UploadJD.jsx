import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const UploadJD = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      await api.post("/jd/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("JD uploaded successfully");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow w-[420px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Upload Job Description
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 mb-3 border rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Job Title"
          className="w-full p-2 mb-3 border rounded"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept=".pdf,.txt"
          className="w-full p-2 mb-4"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
        >
          {loading ? "Uploading..." : "Upload JD"}
        </button>
      </form>
    </div>
  );
};

export default UploadJD;
