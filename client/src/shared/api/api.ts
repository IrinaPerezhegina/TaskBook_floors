import { USER_LOCALSTORAGE_KEY } from "@/shared";
import axios from "axios";

export const $api = axios.create({
   baseURL: "https://backendtasks.vercel.app/",
  });

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || ""
    }`;
  }
  return config;
});
