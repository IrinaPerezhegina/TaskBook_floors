import { StateSchema } from "../../../../../app/types/StateSchema";

export const getLoginError = (state: StateSchema) => state.auth.errorLogin;
