import { StateSchema } from "../../../../../app/types/StateSchema";

export const getLoginIsLoading = (state: StateSchema) =>
  state.auth.loadingLogin;
