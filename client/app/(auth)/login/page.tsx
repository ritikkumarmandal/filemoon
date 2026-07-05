"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators/auth";
import { loginUser } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const res = await loginUser(data);
      console.log(res.data);

      // ✅ REDIRECT TO DASHBOARD AFTER LOGIN
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 shadow-lg rounded-lg space-y-4 bg-white"
      >

        <h1 className="text-xl font-bold text-center">
          Welcome Back 👋
        </h1>

        {/* EMAIL */}
        <input
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full rounded"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 w-full rounded"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        {/* LOGIN BUTTON */}
        <button
          disabled={isSubmitting || loading}
          className="bg-black text-white w-full p-2 rounded hover:bg-gray-800"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGN UP LINK */}
        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Sign Up
          </Link>
        </p>

      </form>
    </div>
  );
}