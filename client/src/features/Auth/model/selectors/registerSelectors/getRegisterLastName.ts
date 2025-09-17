import { StateSchema } from "@/shared";

export const getRegisterLastName = (state: StateSchema) => state.auth.lastName;
