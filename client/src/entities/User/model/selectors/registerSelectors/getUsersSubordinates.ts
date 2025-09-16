import { StateSchema } from "@/app/types/StateSchema";

export const getUsersSubordinates = (state: StateSchema) => state.users.data;
