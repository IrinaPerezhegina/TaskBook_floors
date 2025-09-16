import { StateSchema } from "@/app/types/StateSchema";
export const getTaskTitle = (state: StateSchema) => state.tasks.task.title;
