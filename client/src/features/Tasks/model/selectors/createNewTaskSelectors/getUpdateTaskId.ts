import { StateSchema } from "@/app/types/StateSchema";
export const getUpdateTaskId = (state: StateSchema) => state.tasks.task.id;
