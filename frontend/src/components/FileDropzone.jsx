import { useRef, useState } from "react";
import { motion } from "framer-motion";

const FileDropzone = ({ onFileSelect }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "text/plain",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Only PDF or TXT files are allowed");
      return;
    }

    setFileName(file.name);
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      whileHover={{ scale: 1.01 }}
      className={`cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition
        ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/30"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {fileName ? (
        <p className="text-sm font-medium">
          📄 {fileName}
        </p>
      ) : (
        <>
          <p className="font-medium">
            Drag & drop your JD here
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            or click to browse (PDF, TXT)
          </p>
        </>
      )}
    </motion.div>
  );
};

export default FileDropzone;
