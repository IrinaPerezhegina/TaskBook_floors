import { StateSchema } from "@/app/types/StateSchema";
export const getTaskLoading = (state: StateSchema) => state.tasks.isLoadingCreateTask;
