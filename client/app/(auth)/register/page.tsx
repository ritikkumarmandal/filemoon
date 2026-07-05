"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators/auth";
import { registerUser } from "../../../services/auth";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await registerUser(data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 shadow-lg rounded-lg space-y-4 bg-white"
      >

        <h1 className="text-xl font-bold text-center">
          Create Account 🚀
        </h1>

        <input
          placeholder="Name"
          {...register("name")}
          className="border p-2 w-full rounded"
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input
          placeholder="Email"
          {...register("email")}
          className="border p-2 w-full rounded"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border p-2 w-full rounded"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button
          disabled={isSubmitting}
          className="bg-black text-white w-full p-2 rounded hover:bg-gray-800"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        {/* 👇 SIGN IN LINK ADDED */}
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Sign In
          </Link>
        </p>

      </form>
    </div>
  );
}