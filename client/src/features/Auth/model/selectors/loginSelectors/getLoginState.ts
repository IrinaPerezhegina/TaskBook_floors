import { StateSchema } from "@/app/types/StateSchema";

export const getLoginState = (state: StateSchema) => state.auth;
