import { StateSchema } from "@/app/types/StateSchema";
export const getTaskError = (state: StateSchema) => state.tasks.errorCreateTask;
