import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterMiddleName = (state: StateSchema) =>
  state.auth.middleName;
