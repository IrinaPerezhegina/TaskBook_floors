import axios from "axios";

import { ThunkConfig } from "@/app/store";
import { Task } from "@/entities/Task/model/types/task";
import { $api } from "@/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskResponse } from "../fetchTasksByUserId/fetchUserTasks";

export const createNewTask = createAsyncThunk<TaskResponse, Task, ThunkConfig<string>>(
  "tasks/createNewTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await $api.post<TaskResponse>(`tasks/`, data);
      if (!response.data) {
        throw new Error();
      }
      return response.data;
    } catch (err: unknown) {
      console.log(err);

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
