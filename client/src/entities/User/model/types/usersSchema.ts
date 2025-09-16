import { User } from "./user";

export interface usersSchema {
  isLoading: boolean;
  error?: string;
  data?: User[];
}
