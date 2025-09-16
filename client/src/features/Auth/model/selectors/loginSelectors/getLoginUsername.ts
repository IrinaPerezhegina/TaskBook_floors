import { StateSchema } from "@/app/types/StateSchema";

export const getLoginUsername = (state: StateSchema) => state.auth.login;
