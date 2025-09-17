import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { $api, ThunkConfig, USER_LOCALSTORAGE_KEY } from "@/shared";
import { AuthResponse } from "../../types/auth";

interface RegisterData {
  firstName: string;
  lastName: string;
  middleName?: string;
  login: string;
  password: string;
  managerId?: number | null;
}

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterData,
  ThunkConfig
>("auth/registerUser", async (registerData, { rejectWithValue }) => {
  try {
    const { data } = await $api.post<AuthResponse>(`auth/signup`, {
      password: registerData.password,
      firstName: registerData.firstName,
      middleName: registerData.middleName,
      lastName: registerData.lastName,
      managerId: registerData.managerId,
      login: registerData.login,
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
});
