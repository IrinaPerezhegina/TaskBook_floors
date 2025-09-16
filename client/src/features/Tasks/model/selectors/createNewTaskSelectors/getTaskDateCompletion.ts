import { StateSchema } from "@/app/types/StateSchema";
export const getTaskDateCompletion = (state: StateSchema) =>
  state.tasks.task.dueDate;
