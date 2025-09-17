import { StateSchema } from "@/shared";

export const getUserTasksLoading = (state: StateSchema) =>
  state.tasks.isLoading;
