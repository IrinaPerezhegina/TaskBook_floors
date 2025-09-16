import { StateSchema } from "@/app/types/StateSchema";

export const getErrorUsersForRegister = (state: StateSchema) =>
  state.users.error;
