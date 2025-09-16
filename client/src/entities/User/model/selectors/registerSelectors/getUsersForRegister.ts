import { StateSchema } from "@/app/types/StateSchema";

export const getUsersForRegister = (state: StateSchema) =>
  state.users.data || [];
