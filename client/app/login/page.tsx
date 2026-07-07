"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {

      setLoading(true);

      await loginUser(form);

      alert("Login Successful");

      router.push("/");

    } catch (err: any) {

      alert(
        err?.response?.data?.message ||
          "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-[400px]"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-6"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

      </form>

    </main>
  );
}