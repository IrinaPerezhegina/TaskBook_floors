import { StateSchema } from "@/shared";

export const getTaskTitle = (state: StateSchema) => state.tasks.task.title;
