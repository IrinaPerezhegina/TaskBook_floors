import { StateSchema } from "@/app/types/StateSchema";
export const getTaskStatus = (state: StateSchema) => state.tasks.task.status;
