import { StateSchema } from "@/shared";

export const getRegisterPassword = (state: StateSchema) => state.auth.password;
