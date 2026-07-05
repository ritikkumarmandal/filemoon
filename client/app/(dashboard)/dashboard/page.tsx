"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getFiles,
  deleteFile,
  createShareLink,
} from "@/services/file.service";

interface FileItem {
  id: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const loadFiles = async () => {
    try {
      const res = await getFiles();
      setFiles(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file?")) return;

    try {
      await deleteFile(id);
      loadFiles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (id: string) => {
    try {
      const res = await createShareLink({
        fileId: id,
      });

      await navigator.clipboard.writeText(res.data.shareUrl);

      alert("Share link copied successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create share link.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">Total Files</h2>
          <p className="text-3xl font-bold mt-2">{files.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">Storage Used</h2>
          <p className="text-3xl font-bold mt-2">
            {(
              files.reduce((sum, file) => sum + file.fileSize, 0) /
              (1024 * 1024)
            ).toFixed(2)}{" "}
            MB
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">Shared Links</h2>
          <p className="text-3xl font-bold mt-2">--</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold">Downloads</h2>
          <p className="text-3xl font-bold mt-2">--</p>
        </div>

      </div>

      {/* Recent Files */}
      <div className="bg-white mt-8 rounded-lg shadow p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Recent Files
          </h2>

          <Link
            href="/dashboard/files"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {files.length === 0 ? (
          <p className="text-gray-500">
            No files uploaded yet.
          </p>
        ) : (
          <table className="w-full border-collapse">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  File
                </th>

                <th className="text-left">
                  Size
                </th>

                <th className="text-left">
                  Uploaded
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {files.slice(0, 5).map((file) => (

                <tr key={file.id} className="border-b">

                  <td className="py-3">
                    {file.fileName}
                  </td>

                  <td>
                    {(file.fileSize / 1024).toFixed(1)} KB
                  </td>

                  <td>
                    {new Date(file.createdAt).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex gap-2 justify-center">

                      <a
                        href={`http://localhost:5003${file.fileUrl}`}
                        target="_blank"
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Download
                      </a>

                      <button
                        onClick={() => handleShare(file.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Share
                      </button>

                      <button
                        onClick={() => handleDelete(file.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}