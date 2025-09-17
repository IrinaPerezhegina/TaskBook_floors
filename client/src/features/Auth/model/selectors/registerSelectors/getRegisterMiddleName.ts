import { StateSchema } from "@/shared";

export const getRegisterMiddleName = (state: StateSchema) =>
  state.auth.middleName;
