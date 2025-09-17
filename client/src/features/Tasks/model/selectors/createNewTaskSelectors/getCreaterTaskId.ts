import { StateSchema } from "@/shared";

export const getCreaterTaskId = (state: StateSchema) =>
  state.tasks.task.creatorId;
