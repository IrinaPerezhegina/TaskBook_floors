import { StateSchema } from "@/app/types/StateSchema";
export const getTaskDescription = (state: StateSchema) =>
  state.tasks.task.description;
