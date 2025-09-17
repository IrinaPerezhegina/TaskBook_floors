import { StateSchema } from "@/shared";

export const getManagerId = (state: StateSchema) => state.auth.user?.managerId;
