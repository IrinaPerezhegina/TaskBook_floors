import { StateSchema } from "../../../../../shared/types/StateSchema";

export const getAuthUser = (state: StateSchema) => state.auth.user;
