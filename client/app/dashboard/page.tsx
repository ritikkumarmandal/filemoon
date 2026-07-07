"use client";

import { useEffect, useState } from "react";

import { getFiles } from "@/services/file";

import Upload  from "@/components/Upload";

export default function Dashboard() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getFiles();

      setFiles(res.data.files);
    }

    load();
  }, []);

  return (
    <div>

      <h1>Dashboard</h1>

      {files.map((file: any) => (
        <div key={file._id}>

          {file.fileName}

        </div>
      ))}

       

    </div>
  );
}