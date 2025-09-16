import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterError = (state: StateSchema) =>
  state.auth.errorRegister;
