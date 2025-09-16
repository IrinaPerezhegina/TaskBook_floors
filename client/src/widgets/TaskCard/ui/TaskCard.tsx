import { memo } from "react";

import { Task } from "@/entities/Task";
import {
  classNames,
  getDateNewFormat,
  getFullName,
  getPriorityTask,
  getStatusTask,
  getTitleColor,
} from "@/shared";

import cls from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
  updateTask: (value: number | undefined) => void;
  className?: string;
}
export const TaskCard = memo((props: TaskCardProps) => {
  const { className, task, updateTask } = props;

  return (
    <div
      className={classNames(cls.TaskCard, [className])}
      onClick={() => updateTask(task.id)}
    >
      <h3
        className={classNames(cls.TaskTitle, [
          cls[getTitleColor(task.dueDate, task.status)],
        ])}
      >
        {task.title}
      </h3>

      <div className={cls.TaskInfo}>
        <div>
          <strong>Приоритет:</strong>
          <span className={classNames(cls.Priority, [cls[task.priority]])}>
            {getPriorityTask(task.priority)}
          </span>
        </div>
        <div>
          <strong>Дата окончания:</strong> {getDateNewFormat(task.dueDate)}
        </div>
        <div>
          <strong>Ответственный:</strong> {getFullName(task.assignee)}
        </div>
        <div>
          <strong>Статус:</strong>
          <span className={classNames(cls.Status, [cls[task.status]])}>
            {getStatusTask(task.status)}
          </span>
        </div>
      </div>
    </div>
  );
});
