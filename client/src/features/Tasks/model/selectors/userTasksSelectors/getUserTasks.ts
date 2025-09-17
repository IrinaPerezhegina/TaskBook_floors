import { StateSchema } from "@/shared";

export const getUserTasks = (state: StateSchema) => state.tasks.tasks;
