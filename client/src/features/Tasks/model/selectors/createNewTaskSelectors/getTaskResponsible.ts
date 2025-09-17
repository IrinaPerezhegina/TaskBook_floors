import { StateSchema } from "@/shared";

export const getTaskResponsible = (state: StateSchema) =>
  state.tasks.task.assigneeId;
