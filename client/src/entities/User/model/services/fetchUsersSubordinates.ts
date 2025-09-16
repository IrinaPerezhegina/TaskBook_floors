import axios from "axios";

import { ThunkConfig } from "@/app/store";
import { $api } from "@/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/user";

export const fetchUsersSubordinates = createAsyncThunk<
  User[],
  string,
  ThunkConfig<string>
>("users/fetchUsersSubordinates", async (userId, { rejectWithValue }) => {
  try {
    const response = await $api.get<User[]>(`users/subordinates`, {
      params: { id: userId },
    });
    if (!response.data) {
      throw new Error();
    }
    return response.data;
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
