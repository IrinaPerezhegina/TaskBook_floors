import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterLogin = (state: StateSchema) => state.auth.login;
