import { StateSchema } from "@/shared";

export const getRegisterManagerId = (state: StateSchema) =>
  state.auth.managerId;
