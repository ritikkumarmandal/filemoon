"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search files..."
        className="border rounded-lg px-4 py-2 w-80"
      />

      <div className="flex items-center gap-4">
        <span className="font-medium">Ritik</span>

        <Link
          href="/"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </Link>
      </div>
    </header>
  );
}