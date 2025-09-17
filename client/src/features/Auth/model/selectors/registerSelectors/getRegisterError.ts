import { StateSchema } from "@/shared";

export const getRegisterError = (state: StateSchema) =>
  state.auth.errorRegister;
