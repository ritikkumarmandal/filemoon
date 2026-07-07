"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/services/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      router.push("/login");

      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <nav className="section flex items-center justify-between py-6">
        {/* Logo */}

        <Link
          href="/"
          className="text-3xl font-black text-indigo-700"
        >
          File<span className="text-orange-500">Moon</span>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-10">
          <Link
            href="/"
            className="font-medium hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            href="/#features"
            className="font-medium hover:text-indigo-600"
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className="font-medium hover:text-indigo-600"
          >
            Pricing
          </Link>

          <Link
            href="/contact"
            className="font-medium hover:text-indigo-600"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex gap-4">
          {!loading &&
            (user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-5 py-2 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="gradient-button px-5 py-2 rounded-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="gradient-button px-5 py-2 rounded-xl"
                >
                  Register
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          <Menu size={30} />
        </button>
      </nav>

      {/* Mobile Menu */}

      {open && (
        <div className="lg:hidden glass mx-5 rounded-2xl p-6">
          <div className="flex flex-col gap-5">
            <Link href="/">Home</Link>

            <Link href="/#features">Features</Link>

            <Link href="/pricing">Pricing</Link>

            <Link href="/contact">Contact</Link>

            {!loading &&
              (user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="border rounded-xl p-3 text-center"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="gradient-button rounded-xl p-3"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="border rounded-xl p-3 text-center"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="gradient-button rounded-xl p-3 text-center"
                  >
                    Register
                  </Link>
                </>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}