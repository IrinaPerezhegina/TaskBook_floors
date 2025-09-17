import { StateSchema } from "@/shared";

export const getLoginUsername = (state: StateSchema) => state.auth.login;
