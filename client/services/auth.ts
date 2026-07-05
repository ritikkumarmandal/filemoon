import { api } from "@/lib/api";

export const registerUser = (data: any) =>
  api.post("/auth/register", data);

export const loginUser = (data: any) =>
  api.post("/auth/login", data);

export const getMe = () =>
  api.get("/auth/me");

export const logoutUser = () =>
  api.post("/auth/logout");