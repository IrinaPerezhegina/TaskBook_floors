import { StateSchema } from "@/app/types/StateSchema";
export const getTaskResponsible = (state: StateSchema) =>
  state.tasks.task.assigneeId;
