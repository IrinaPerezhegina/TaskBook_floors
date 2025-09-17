import { StateSchema } from "@/shared";

export const getRegisterLoading = (state: StateSchema) =>
  state.auth.loadingRegister;
