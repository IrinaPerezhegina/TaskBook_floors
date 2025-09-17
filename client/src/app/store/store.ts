import { configureStore } from "@reduxjs/toolkit";

import { usersReducer } from "@/entities/User";
import { authReducer } from "@/features/Auth";
import { tasksReducer } from "@/features/Tasks";
import { StateSchema } from "@/shared";

export const store = configureStore<StateSchema>({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
