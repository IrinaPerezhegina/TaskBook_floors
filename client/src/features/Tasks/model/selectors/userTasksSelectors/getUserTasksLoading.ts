import { StateSchema } from "@/app/types/StateSchema";

export const getUserTasksLoading = (state: StateSchema) =>
  state.tasks.isLoading;
