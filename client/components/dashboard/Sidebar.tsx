"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Upload", href: "/upload" },
  { name: "My Files", href: "/files" },
  { name: "Shared Links", href: "/shared" },
  { name: "Settings", href: "/settings" },
  { name: "Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">🚀 FileMoon</h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 rounded transition ${
              pathname === item.href
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}