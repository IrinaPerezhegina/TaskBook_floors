import { StateSchema } from "@/app/types/StateSchema";

export const getUserTasksError = (state: StateSchema) => state.tasks.error;
