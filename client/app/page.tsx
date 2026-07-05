"use client";

import Link from "next/link";
import { useState } from "react";
import { uploadFile } from "@/services/file.service";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      await uploadFile(formData);

      alert("Uploaded successfully 🚀");

      setFile(null);
      (document.getElementById("fileInput") as HTMLInputElement).value = "";
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP BAR */}
      <header className="flex justify-between items-center p-5 bg-white shadow">

        {/* LOGO */}
        <h1 className="text-2xl font-bold text-blue-600">
          FileMoon 🚀
        </h1>

        {/* AUTH BUTTONS */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* MAIN AREA */}
      <main className="flex flex-col items-center justify-center mt-24">

        <h2 className="text-4xl font-bold mb-6">
          Upload Files & Folders 🚀
        </h2>

        <p className="text-gray-600 mb-8">
          Secure cloud file sharing platform
        </p>

        {/* FILE INPUT */}
        <input
          id="fileInput"
          type="file"
          multiple
          className="border p-4 bg-white rounded"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* SELECTED FILE */}
        {file && (
          <p className="mt-4 text-gray-700">
            Selected: <b>{file.name}</b>
          </p>
        )}

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`mt-6 px-6 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </main>
    </div>
  );
}