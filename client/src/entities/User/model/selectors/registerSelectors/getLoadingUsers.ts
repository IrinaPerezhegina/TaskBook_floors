import { StateSchema } from "@/app/types/StateSchema";

export const getLoadingUsers = (state: StateSchema) => state.users.isLoading;
