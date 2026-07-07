"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
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

      await registerUser(form);

      alert("Registration Successful");

      router.push("/login");

    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Registration Failed"
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
          Register
        </h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-6"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

      </form>

    </main>
  );
}