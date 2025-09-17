import { StateSchema } from "@/shared";

export const getLoadingUsers = (state: StateSchema) => state.users.isLoading;
