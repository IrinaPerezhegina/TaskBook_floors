import { useEffect } from "react";

import { fetchUsersSubordinates, HeaderUser } from "@/entities/User";
import { getAuthUser } from "@/features/Auth";
import { ActionsTasks } from "@/features/Tasks";
import { getUserTasksError } from "@/features/Tasks/model/selectors/userTasksSelectors/getUserTasksError";
import { getUserTasksLoading } from "@/features/Tasks/model/selectors/userTasksSelectors/getUserTasksLoading";
import { Error, Header, Loader, PageLayout } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/hooks";
import { fetchUserTasks } from "../../../features/Tasks/model/services/fetchTasksByUserId/fetchUserTasks";

const TasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthUser);
  const isLoading = useAppSelector(getUserTasksLoading);
  const error = useAppSelector(getUserTasksError);

  useEffect(() => {
    if (user) {
      if (user) {
        dispatch(fetchUsersSubordinates(user.id));
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserTasks(Number(user.id)));
    }
  }, [dispatch, user]);

  return (
    <div>
      <PageLayout head={<Header children={<HeaderUser />} />}>
        <ActionsTasks id={Number(user?.id)} />
        <Loader isLoading={isLoading} variant="bigLoader" />
        <Error error={error} />
      </PageLayout>
    </div>
  );
};
export default TasksPage;
