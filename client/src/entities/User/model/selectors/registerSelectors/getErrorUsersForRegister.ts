import { StateSchema } from "@/shared";

export const getErrorUsersForRegister = (state: StateSchema) =>
  state.users.error;
