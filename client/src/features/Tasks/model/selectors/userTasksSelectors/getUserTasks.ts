import { StateSchema } from "@/app/types/StateSchema";

export const getUserTasks = (state: StateSchema) => state.tasks.tasks;
