import { ThunkConfig } from "@/app/store";
import { $api } from "@/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthResponse } from "../../types/auth";

// Тип пользователя (пример)

// Тип состояния аутентификации

// Начальное состояние

// Пример асинхронного thunk для получения данных пользователя по токену
export const initAuthUser = createAsyncThunk<
  AuthResponse, // возвращаемый тип
  void,
  ThunkConfig
>("auth/initAuthUser", async (_, { rejectWithValue }) => {
  try {
    const { data } = await $api.get<AuthResponse>("/auth/me", {});

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
