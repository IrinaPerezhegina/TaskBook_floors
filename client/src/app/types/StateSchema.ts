import { usersSchema } from "@/entities/User";
import { AuthSchema } from "@/features/Auth";
import { tasksSchema } from "@/features/Tasks";

export interface StateSchema {
  auth: AuthSchema;
  users: usersSchema;
  tasks: tasksSchema;
}
