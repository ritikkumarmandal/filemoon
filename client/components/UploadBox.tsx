"use client";

import { useRef, useState } from "react";
import { Upload, FolderOpen, File } from "lucide-react";
import { uploadFiles } from "@/services/transfer";

interface UploadBoxProps {
  onNext: (files: File[]) => void;
}

export default function UploadBox({
  onNext,
}: UploadBoxProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;

    setFiles((prev) => [
      ...prev,
      ...Array.from(selected),
    ]);
  };

  const totalSize = files.reduce(
    (sum, file) => sum + file.size,
    0
  );

  return (
    <div className="max-w-4xl mx-auto">

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-blue-500 rounded-3xl p-16 text-center bg-white shadow-xl"
      >
        <Upload
          className="mx-auto mb-5 text-blue-600"
          size={70}
        />

        <h2 className="text-3xl font-bold">
          Drag & Drop Files
        </h2>

        <p className="text-gray-500 mt-3">
          Upload Files or Entire Folder
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Upload Files
          </button>

          <button
            onClick={() => folderInputRef.current?.click()}
            className="border px-6 py-3 rounded-xl"
          >
            Upload Folder
          </button>

        </div>

        <input
          hidden
          multiple
          type="file"
          ref={fileInputRef}
          onChange={(e) =>
            handleFiles(e.target.files)
          }
        />
         <input
  hidden
  multiple
  type="file"
  ref={folderInputRef}
  onChange={(e) => handleFiles(e.target.files)}
  {...({ webkitdirectory: "", directory: "" } as any)}
/>
        
      </div>

      {files.length > 0 && (

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

          <div className="flex justify-between">

            <h2 className="font-bold text-xl">
              Selected Files
            </h2>

            <span>
              {(totalSize / 1024 / 1024).toFixed(2)}
              MB
            </span>

          </div>

          <div className="mt-5 space-y-3 max-h-80 overflow-y-auto">

            {files.map((file, index) => (

              <div
                key={index}
                className="flex items-center justify-between border rounded-xl p-3"
              >
                <div className="flex items-center gap-3">

                  <File />

                  <div>

                    <p className="font-medium">
                      {file.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {uploading && (
  <div className="mt-6">

    <div className="h-3 rounded-full bg-gray-200">

      <div
        className="h-3 rounded-full bg-blue-600 transition-all"
        style={{
          width: `${progress}%`,
        }}
      />

    </div>

    <p className="mt-2 text-center">
      Uploading {progress}%
    </p>

  </div>
)}

<button
  disabled={uploading}
  onClick={async () => {
    try {
      setUploading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await uploadFiles(
        formData,
        setProgress
      );

      onNext(res.data);

    } catch (err) {
      console.error(err);
      alert("Login and register to upload files");
    } finally {
      setUploading(false);
    }
  }}
  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold disabled:bg-gray-400"
>
  {uploading ? `Uploading ${progress}%` : "Continue"}
</button>
        </div>

      )}

    </div>
  );
}