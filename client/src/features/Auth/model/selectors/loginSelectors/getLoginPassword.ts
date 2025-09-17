import { StateSchema } from "../../../../../shared/types/StateSchema";

export const getLoginPassword = (state: StateSchema) => state.auth.password;
