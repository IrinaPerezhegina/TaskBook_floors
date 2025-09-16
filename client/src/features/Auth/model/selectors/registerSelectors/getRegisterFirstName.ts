import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterFirstName = (state: StateSchema) =>
  state.auth.firstName;
