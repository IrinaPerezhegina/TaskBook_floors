import { StateSchema } from "@/shared";

export const getTaskDescription = (state: StateSchema) =>
  state.tasks.task.description;
