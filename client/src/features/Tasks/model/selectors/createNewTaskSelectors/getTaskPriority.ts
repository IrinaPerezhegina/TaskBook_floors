import { StateSchema } from "@/shared";

export const getTaskPriority = (state: StateSchema) =>
  state.tasks.task.priority;
