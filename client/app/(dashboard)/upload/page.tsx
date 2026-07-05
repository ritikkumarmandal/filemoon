"use client";

import { useState, DragEvent } from "react";
import { uploadFile } from "@/services/file.service";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    setFiles(Array.from(selected));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Select at least one file");
      return;
    }

    try {
      setLoading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        await uploadFile(formData);
      }

      alert("Files uploaded successfully");

      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Upload Files
      </h1>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 rounded-xl p-12 text-center bg-white"
      >
        <p className="text-lg mb-4">
          Drag & Drop files here
        </p>

        <p className="mb-4 text-gray-500">
          or
        </p>

        <input
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow p-5">

          <h2 className="font-semibold mb-4">
            Selected Files
          </h2>

          {files.map((file) => (
            <div
              key={file.name}
              className="flex justify-between border-b py-2"
            >
              <span>{file.name}</span>

              <span>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Uploading..." : "Upload Files"}
          </button>

        </div>
      )}
    </div>
  );
}