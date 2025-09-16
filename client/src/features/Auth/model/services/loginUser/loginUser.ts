import { ThunkConfig } from "@/app/store";
import { $api, USER_LOCALSTORAGE_KEY } from "@/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthResponse } from "../../types/auth";

interface LoginData {
  login: string;
  password: string;
}

export const loginUser = createAsyncThunk<AuthResponse, LoginData, ThunkConfig>(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await $api.post<AuthResponse>(`auth/signin`, {
        password: loginData.password,
        login: loginData.login,
      });
      const { token } = data;
      if (token) {
        // Сохраняем токен в localStorage
        localStorage.setItem(USER_LOCALSTORAGE_KEY, token);
      }

      return data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // err теперь типизирован как AxiosError
        if (err.response?.data) {
          return rejectWithValue(err.response.data.error);
        }
      }
      // Если ошибка не AxiosError или нет response.data
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
