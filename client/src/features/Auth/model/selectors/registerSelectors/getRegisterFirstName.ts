import { StateSchema } from "@/shared";

export const getRegisterFirstName = (state: StateSchema) =>
  state.auth.firstName;
