import { StateSchema } from "@/app/types/StateSchema";

export const getCreaterTaskId = (state: StateSchema) => state.tasks.task.creatorId;
export const getCreaterTaskcc = (state: StateSchema) => state.auth.managerId;

