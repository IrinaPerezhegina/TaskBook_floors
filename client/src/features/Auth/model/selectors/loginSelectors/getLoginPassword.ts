import { StateSchema } from "../../../../../app/types/StateSchema";

export const getLoginPassword = (state: StateSchema) => state.auth.password;
