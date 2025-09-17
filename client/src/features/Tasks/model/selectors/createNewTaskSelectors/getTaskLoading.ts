import { StateSchema } from "@/shared";

export const getTaskLoading = (state: StateSchema) =>
  state.tasks.isLoadingCreateTask;
