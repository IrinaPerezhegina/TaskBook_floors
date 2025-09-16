import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterPassword = (state: StateSchema) => state.auth.password;
