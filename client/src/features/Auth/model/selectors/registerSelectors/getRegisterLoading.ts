import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterLoading = (state: StateSchema) =>
  state.auth.loadingRegister;
