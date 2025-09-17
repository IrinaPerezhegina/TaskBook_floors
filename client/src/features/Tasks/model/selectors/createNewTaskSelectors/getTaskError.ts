import { StateSchema } from "@/shared";

export const getTaskError = (state: StateSchema) => state.tasks.errorCreateTask;
