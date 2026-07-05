"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema } from "@/lib/validators/auth";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await registerUser(data);
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 shadow-lg rounded-lg bg-white space-y-4"
      >

        <h1 className="text-2xl font-bold text-center">
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
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}