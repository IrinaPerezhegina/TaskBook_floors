import { StateSchema } from "@/shared";

export const getTaskDateCompletion = (state: StateSchema) =>
  state.tasks.task.dueDate;
