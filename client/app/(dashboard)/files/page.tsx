"use client";

import { useEffect, useState } from "react";
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

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    try {
      const res = await getFiles();
      setFiles(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

      const link = `http://localhost:5555/share/${res.data.token}`;

      navigator.clipboard.writeText(link);

      alert("Share link copied!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading files...</p>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        My Files
      </h1>

      <div className="bg-white rounded-lg shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                File
              </th>

              <th className="p-4">
                Size
              </th>

              <th className="p-4">
                Uploaded
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {files.map((file) => (

              <tr key={file.id} className="border-b">

                <td className="p-4">
                  {file.fileName}
                </td>

                <td className="p-4 text-center">
                  {(file.fileSize / 1024).toFixed(1)} KB
                </td>

                <td className="p-4 text-center">
                  {new Date(file.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <div className="flex gap-2 justify-center">

                    <a
                      href={`http://localhost:5003${file.fileUrl}`}
                      target="_blank"
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Download
                    </a>

                   <button
  onClick={async () => {
    const res = await createShareLink({
      fileId: file.id,
    });

    alert(res.data.shareUrl);
  }}
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

      </div>

    </div>
  );
}