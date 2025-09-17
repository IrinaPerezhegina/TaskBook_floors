import { StateSchema } from "@/shared";

export const getTaskStatus = (state: StateSchema) => state.tasks.task.status;
