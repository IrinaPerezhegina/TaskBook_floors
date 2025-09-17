import { StateSchema } from "@/shared";

export const getUsersForRegister = (state: StateSchema) =>
  state.users.data || [];
