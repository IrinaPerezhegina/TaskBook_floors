import { StateSchema } from "../../../../../shared/types/StateSchema";

export const getLoginIsLoading = (state: StateSchema) =>
  state.auth.loadingLogin;
