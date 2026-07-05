import axios from "axios";

export const api = axios.create({
  baseURL: "https://filemoon-production.up.railway.app/api",
  withCredentials: true,
});