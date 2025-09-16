import { StateSchema } from "@/app/types/StateSchema";
export const getTaskPriority = (state: StateSchema) =>
  state.tasks.task.priority;
