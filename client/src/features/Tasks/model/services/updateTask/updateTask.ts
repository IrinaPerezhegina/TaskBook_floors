import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Task } from "@/entities/Task/model/types/task";
import { TaskResponse } from "@/features/Tasks/model/services/fetchTasksByUserId/fetchUserTasks";
import { $api, ThunkConfig } from "@/shared";

export const updateTask = createAsyncThunk<
  TaskResponse,
  Partial<Task>,
  ThunkConfig<string>
>("tasks/updateTask", async (data, { rejectWithValue }) => {
  try {
    const response = await $api.patch<TaskResponse>(`tasks/${data.id}`, data);
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
});
