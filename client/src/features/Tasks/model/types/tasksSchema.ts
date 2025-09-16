import { Task } from "@/entities/Task/model/types/task";
import { TaskResponse } from "../services/fetchTasksByUserId/fetchUserTasks";

export interface tasksSchema {
  tasks: TaskResponse[];
  task: Task;
  isLoadingCreateTask?: boolean;
  isLoading?: boolean;
  errorCreateTask?: string;
  error?: string;
}
