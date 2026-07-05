"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = (user: any) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);
};