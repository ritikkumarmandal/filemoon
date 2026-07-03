import axios from "axios";

const API = axios.create({
  baseURL: "filemoon-production.up.railway.app/api",
  withCredentials: true,
});

export default API;