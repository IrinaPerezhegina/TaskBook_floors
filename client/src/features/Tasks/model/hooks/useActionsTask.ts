import { useCallback, useEffect, useMemo, useState } from "react";

import { Priority, Status, Task } from "@/entities/Task";
import { getUsersSubordinates } from "@/entities/User";
import { getFullName, useAppDispatch, useAppSelector } from "@/shared";
import { SelectOption } from "@/shared/types";
import {
  getCreaterTaskId,
  getManagerId,
  getTaskDateCompletion,
  getTaskDescription,
  getTaskError,
  getTaskLoading,
  getTaskPriority,
  getTaskResponsible,
  getTaskStatus,
  getTaskTitle,
  getUserTasks,
} from "../../model/selectors";
import { getUpdateTaskId } from "../../model/selectors/createNewTaskSelectors/getUpdateTaskId";
import { createNewTask } from "../../model/services/cteateNewTask/createNewTask";
import { updateTask } from "../../model/services/updateTask/updateTask";
import { tasksActions } from "../../model/slice/tasksSlice";

interface UseActionsTasksProps {
  id: number;
}

interface UseFActionsTasksResult {
  taskModalfunc: {
    onUpdateTaskId: (value?: number) => void;
    onCloseModal: () => void;
    onSelectedResponsible: (value: string) => void;
    onCreateNewTask: () => Promise<void>;
    onChangeVisibilityModalCreateTask: () => void;
    onChangeTitle: (value: string) => void;
    onChangeDescription: (value: string) => void;
    onChangeStatus: (value: string) => void;
    onChangeDateCompletion: (value: string) => void;
    onChangePriority: (value: string) => void;
  };
  isLoadingCreateTask: boolean | undefined;
  error: string | undefined;
  options: SelectOption[] | undefined;
  isOpren: boolean;
  readOnly: boolean;
  isUpdate: boolean | undefined;
  statusTask: string;
  title: string;
  description: string;
  dateCompletion: string;
  priorityTask: string;
  responsibleId: number | undefined;
  tasks: Task[];
  managerId: string | null | undefined;
}

export const useActionsTask = (
  props: UseActionsTasksProps
): UseFActionsTasksResult => {
  const { id } = props;
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getUpdateTaskId);
  const title = useAppSelector(getTaskTitle);
  const description = useAppSelector(getTaskDescription);
  const dateCompletion = useAppSelector(getTaskDateCompletion);
  const priorityTask = useAppSelector(getTaskPriority);
  const statusTask = useAppSelector(getTaskStatus);
  const responsibleId = useAppSelector(getTaskResponsible);
  const subordinates = useAppSelector(getUsersSubordinates);
  const isLoadingCreateTask = useAppSelector(getTaskLoading);
  const error = useAppSelector(getTaskError);
  const tasks = useAppSelector(getUserTasks);
  const [isUpdate, setIsUpdate] = useState<boolean | undefined>();
  const [isOpren, setIsOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const managerId = useAppSelector(getManagerId);
  const creatorId = useAppSelector(getCreaterTaskId);

  useEffect(() => {
    if (isUpdate === false) {
      setReadOnly(false);
    } else {
      if (managerId === creatorId) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }
    }
  }, [creatorId, managerId, isUpdate]);

  const onChangeVisibilityModal = useCallback(() => {
    setIsUpdate(true);
    setIsOpen((prev) => !prev);
  }, []);

  const onChangeVisibilityModalCreateTask = useCallback(() => {
    setIsUpdate(false);
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    dispatch(tasksActions.setResponsible(id));
  }, [dispatch, id]);

  const onChangeTitle = useCallback(
    (value: string) => {
      dispatch(tasksActions.setTaskTitle(value));
    },
    [dispatch]
  );

  const onChangeDescription = useCallback(
    (value: string) => {
      dispatch(tasksActions.setTaskDescription(value));
    },
    [dispatch]
  );

  const onChangeDateCompletion = useCallback(
    (value: string) => {
      dispatch(tasksActions.setTaskDateCompletion(value));
    },
    [dispatch]
  );

  const onChangePriority = useCallback(
    (value: string) => {
      dispatch(tasksActions.setPriority(value as Priority));
    },
    [dispatch]
  );

  const onChangeStatus = useCallback(
    (value: string) => {
      dispatch(tasksActions.setStatus(value as Status));
    },
    [dispatch]
  );

  const options = useMemo(() => {
    return subordinates?.map((subordinate) => ({
      value: String(subordinate.id),
      content: getFullName(subordinate),
    }));
  }, [subordinates]);

  const onSelectedResponsible = useCallback(
    (value: string) => {
      dispatch(tasksActions.setResponsible(Number(value)));
    },
    [dispatch]
  );

  const onCreateNewTask = useCallback(async () => {
    if (isUpdate === false) {
      const response = await dispatch(
        createNewTask({
          title,
          description: description,
          dueDate: dateCompletion,
          priority: priorityTask,
          status: statusTask,
          createdAt: new Date(Date.now()).toISOString(),
          creatorId: id,
          updatedAt: new Date(Date.now()).toISOString(),
          assigneeId: responsibleId,
        })
      );

      if (response.meta.requestStatus !== "rejected") {
        dispatch(tasksActions.resetTask());
        onChangeVisibilityModal();
      }
    }

    if (isUpdate === true) {
      const response = await dispatch(
        updateTask({
          title,
          id: taskId,
          description: description,
          dueDate: dateCompletion,
          priority: priorityTask,
          status: statusTask,
          updatedAt: new Date(Date.now()).toISOString(),
          assigneeId: responsibleId,
        })
      );

      if (response.meta.requestStatus !== "rejected") {
        dispatch(tasksActions.resetTask());
        onChangeVisibilityModal();
      }
    }
  }, [
    isUpdate,
    onChangeVisibilityModal,
    dateCompletion,
    responsibleId,
    description,
    dispatch,
    priorityTask,
    statusTask,
    title,
    taskId,
    id,
  ]);

  const onCloseModal = useCallback(() => {
    dispatch(tasksActions.resetTask());
    onChangeVisibilityModal();
  }, [dispatch, onChangeVisibilityModal]);

  const onUpdateTaskId = useCallback(
    (value?: number) => {
      const getUpdateTask = tasks.find((task) => task.id === value);
      if (getUpdateTask) {
        dispatch(tasksActions.setUpdateTask(getUpdateTask));
      }
      onChangeVisibilityModal();
    },
    [dispatch, tasks, onChangeVisibilityModal]
  );

  const funcResult = {
    onUpdateTaskId,
    onCloseModal,
    onSelectedResponsible,
    onCreateNewTask,
    onChangeVisibilityModalCreateTask,
    onChangeTitle,
    onChangeDescription,
    onChangeStatus,
    onChangeDateCompletion,
    onChangePriority,
  };
  const taskModalfunc = funcResult;
  return {
    isLoadingCreateTask,
    error,
    isOpren,
    readOnly,
    options,
    taskModalfunc,
    isUpdate,
    statusTask,
    title,
    description,
    dateCompletion,
    priorityTask,
    responsibleId,
    tasks,
    managerId,
  };
};
