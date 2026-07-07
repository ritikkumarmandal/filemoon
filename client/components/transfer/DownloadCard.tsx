"use client";

import { useEffect, useState } from "react";
import { getTransfer } from "@/services/transfer";

interface Props {
  token: string;
}

export default function DownloadCard({
  token,
}: Props) {
  const [loading, setLoading] = useState(true);

  const [transfer, setTransfer] = useState<any>(null);

  useEffect(() => {
    loadTransfer();
  }, []);

  const loadTransfer = async () => {
    try {
      const res = await getTransfer(token);

      setTransfer(res.data);
    } catch (err) {
      console.error(err);
      alert("Invalid Transfer Link");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-2xl">
        Loading...
      </div>
    );
  }

  if (!transfer) {
    return (
      <div className="text-red-600 text-2xl">
        Transfer Not Found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl w-full">

      <h1 className="text-4xl font-bold mb-8">
        File Transfer
      </h1>

      <div className="space-y-3">

        <p>
          <strong>Sender:</strong>{" "}
          {transfer.senderName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {transfer.senderEmail}
        </p>

        <p>
          <strong>Receiver:</strong>{" "}
          {transfer.receiverEmail}
        </p>

        <p>
          <strong>Subject:</strong>{" "}
          {transfer.subject}
        </p>

        <p>
          <strong>Message:</strong>{" "}
          {transfer.message}
        </p>

      </div>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold mb-4">
        Files
      </h2>

      <div className="space-y-3">

        {transfer.files.map((item: any) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 flex justify-between"
          >
            <span>{item.file.originalName}</span>

            <span>
              {(item.file.fileSize / 1024 / 1024).toFixed(2)}
              MB
            </span>
          </div>
        ))}

      </div>

      <button
        onClick={() =>
          window.open(
            `http://localhost:5003/api/transfer/download/${token}`
          )
        }
        className="gradient-button w-full mt-8 py-4 rounded-xl"
      >
        Download All Files
      </button>

    </div>
  );
}