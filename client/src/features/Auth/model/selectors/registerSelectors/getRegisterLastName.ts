import { StateSchema } from "@/app/types/StateSchema";

export const getRegisterLastName = (state: StateSchema) => state.auth.lastName;
