import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterManagerId = (state: StateSchema) => state.auth.managerId;
