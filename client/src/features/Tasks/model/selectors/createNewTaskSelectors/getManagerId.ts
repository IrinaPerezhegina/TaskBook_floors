import { StateSchema } from "@/app/types/StateSchema";

export const getManagerId = (state: StateSchema) => state.auth.user?.managerId;
