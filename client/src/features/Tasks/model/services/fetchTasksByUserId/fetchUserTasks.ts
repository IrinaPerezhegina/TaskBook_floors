import axios from "axios";

import { ThunkConfig } from "@/app/store";
import { Task } from "@/entities/Task/model/types/task";
import { User } from "@/entities/User/model/types/user";
import { $api } from "@/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface TaskResponse extends Task {
  assignee: User;
  creator: User;
}

export const fetchUserTasks = createAsyncThunk<
  TaskResponse[],
  number,
  ThunkConfig<string>
>("tasks/fetchUserTasks", async (userId, { rejectWithValue }) => {
  try {
    const response = await $api.get<TaskResponse[]>(`tasks/`, {
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
