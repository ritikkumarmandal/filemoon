import axios from "axios";

export const api = axios.create({
 baseURL: "http://filemoon-production.up.railway.app/api",
  //baseURL: "http://localhost:5003/api",
  withCredentials: true,
});