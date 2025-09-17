import { StateSchema } from "@/shared";

export const getUserTasksError = (state: StateSchema) => state.tasks.error;
