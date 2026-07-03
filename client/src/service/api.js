import axios from "axios";

const API = axios.create({
  baseURL: "https://filemoon-production.up.railway.app/api",
  withCredentials: true,
});

export default API;