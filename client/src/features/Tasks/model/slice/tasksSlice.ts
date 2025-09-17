import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Priority, Status, Task } from "@/entities/Task";
import { createNewTask } from "../../model/services/cteateNewTask/createNewTask";
import { updateTask } from "../../model/services/updateTask/updateTask";
import { tasksSchema } from "../../model/types/tasksSchema";
import {
  fetchUserTasks,
  TaskResponse,
} from "../services/fetchTasksByUserId/fetchUserTasks";

const initialState: tasksSchema = {
  isLoading: false,
  error: undefined,
  isLoadingCreateTask: false,
  errorCreateTask: undefined,
  tasks: [],
  task: {
    title: "",
    description: "",
    dueDate: "",
    createdAt: "",
    updatedAt: "",
    priority: Priority.LOW,
    status: Status.TODO,
    assigneeId: undefined,
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetTask: (state) => {
      state.task = {
        ...state.task,
        title: "",
        description: "",
        dueDate: "",
        createdAt: "",
        updatedAt: "",
        priority: Priority.LOW,
        status: Status.TODO,
      };
    },
    setUpdateTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
    },
    setTaskTitle: (state, action: PayloadAction<string>) => {
      state.task.title = action.payload;
    },
    setTaskDescription: (state, action: PayloadAction<string>) => {
      state.task.description = action.payload;
    },
    setTaskDateCompletion: (state, action: PayloadAction<string>) => {
      state.task.dueDate = new Date(action.payload).toISOString();
    },
    setPriority: (state, action: PayloadAction<Priority>) => {
      state.task.priority = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.task.status = action.payload;
    },
    setResponsible: (state, action: PayloadAction<number>) => {
      state.task.assigneeId = Number(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTasks.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchUserTasks.fulfilled,
        (state, action: PayloadAction<TaskResponse[]>) => {
          state.isLoading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewTask.pending, (state) => {
        state.errorCreateTask = undefined;
        state.isLoadingCreateTask = true;
      })
      .addCase(
        createNewTask.fulfilled,
        (state, action: PayloadAction<TaskResponse>) => {
          state.isLoadingCreateTask = false;
          state.tasks = [action.payload, ...state.tasks];
        }
      )
      .addCase(createNewTask.rejected, (state, action) => {
        state.isLoadingCreateTask = false;
        state.errorCreateTask = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.errorCreateTask = undefined;
        state.isLoadingCreateTask = true;
      })
      .addCase(
        updateTask.fulfilled,
        (state, action: PayloadAction<TaskResponse>) => {
          state.isLoadingCreateTask = false;
          const TasksWithoutUpdateTask = state.tasks.filter(
            (task) => task.id !== action.payload.id
          );
          state.tasks = [action.payload, ...TasksWithoutUpdateTask];
        }
      )
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoadingCreateTask = false;
        state.errorCreateTask = action.payload;
      });
  },
});

export const { actions: tasksActions } = tasksSlice;
export const { reducer: tasksReducer } = tasksSlice;
