import { memo, useState } from "react";

import { Button, classNames } from "@/shared";
import { TaskList } from "@/widgets/TaskList";
import { TaskModal } from "@/widgets/TaskModal";
import { useActionsTask } from "../../model/hooks/useActionsTask";

import { FilterWidget } from "@/widgets/FilterWidget";
import cls from "./ActionsTasks.module.scss";

interface ActionsTasksProps {
  id: number;
  className?: string;
}

export const ActionsTasks = memo((props: ActionsTasksProps) => {
  const [mode, setFMode] = useState<"none" | "byDate" | "byResponsible">(
    "none"
  );

  const handleFilterChange = (mode: "none" | "byDate" | "byResponsible") => {
    setFMode(mode);
  };

  const { className, id } = props;
  const {
    error,
    isLoadingCreateTask,
    isOpren,
    options,
    readOnly,
    taskModalfunc,
    title,
    description,
    dateCompletion,
    priorityTask,
    responsibleId,
    tasks,
    isUpdate,
    statusTask,
    managerId,
  } = useActionsTask({ id });

  return (
    <div className={classNames(cls.ActionsTasks, {}, [className])}>
      <FilterWidget
        isManager={Boolean(managerId)}
        mode={mode}
        onChange={handleFilterChange}
      />
      <Button
        className={cls.ActionsTasksBtn}
        text="Создать новую задачу"
        onClick={taskModalfunc.onChangeVisibilityModalCreateTask}
      />
      <TaskList
        isManager={!managerId}
        mode={mode}
        tasks={tasks}
        updateTask={taskModalfunc.onUpdateTaskId}
      />
      <TaskModal
        readOnly={readOnly}
        titleModal={isUpdate ? "Корректировка задачи" : "Новая задача"}
        text={isUpdate ? "Изменить" : "Создать задачу"}
        isLoading={isLoadingCreateTask}
        error={error}
        responsibleId={String(responsibleId)}
        subordinates={options}
        dateCompletion={dateCompletion}
        description={description}
        isOpen={isOpren}
        finalResult={taskModalfunc}
        priorityTask={priorityTask}
        statusTask={statusTask}
        title={title}
      />
    </div>
  );
});
