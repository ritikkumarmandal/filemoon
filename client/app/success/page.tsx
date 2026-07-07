"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";

export default function SuccessPage() {
  const [link, setLink] = useState("");

  useEffect(() => {
    const savedLink = localStorage.getItem("transferLink");

    if (savedLink) {
      setLink(savedLink);
    }
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    alert("Link Copied Successfully");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl w-full">

        <div className="flex justify-center mb-6">

          <CheckCircle
            size={90}
            className="text-green-600"
          />

        </div>

        <h1 className="text-4xl font-bold text-center">
          Transfer Created
        </h1>

        <p className="text-center mt-3 text-gray-500">
          Your files are ready to share.
        </p>

        <div className="mt-8 border rounded-xl p-4 bg-gray-50 break-all">

          {link}

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl"
          >
            <Copy size={18} />
            Copy Link
          </button>

          <a
            href={link}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl"
          >
            <ExternalLink size={18} />
            Open Link
          </a>

        </div>

      </div>

    </main>
  );
}