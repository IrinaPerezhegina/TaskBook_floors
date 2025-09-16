import { USER_LOCALSTORAGE_KEY } from "@/shared";
import axios from "axios";

export const $api = axios.create({
  // baseURL: "https://task-book-tkeo.vercel.app/",
  baseURL: "http://localhost:4000/",
});
$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || ""
    }`;
  }
  return config;
});
