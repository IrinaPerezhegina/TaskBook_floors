import { StateSchema } from "@/shared";

export const getUpdateTaskId = (state: StateSchema) => state.tasks.task.id;
