import { memo, useMemo } from "react";

import { Task } from "@/entities/Task";
import { classNames, getFullName } from "@/shared";
import { TaskCard } from "@/widgets/TaskCard";
import { TaskSection } from "@/widgets/TaskSection";

import cls from "./TaskList.module.scss";

interface TaskListProps {
  tasks: Task[];
  mode: "byDate" | "byResponsible" | "none";
  currentUserId?: number;
  isManager?: boolean; // флаг для отображения режима менеджера
  updateTask: (value?: number) => void;
  className?: string;
}

export const TaskList = memo((props: TaskListProps) => {
  const { className, tasks, updateTask, mode, currentUserId, isManager } =
    props;

  // Фильтрация по текущему пользователю, если требуется
  const filteredTasks = useMemo(() => {
    if (mode === "byResponsible") {
      if (currentUserId) {
        return tasks.filter((task) => task.assigneeId === currentUserId);
      }
    }
    return tasks;
  }, [tasks, currentUserId, mode]);

  // Группировка задач
  const groupedTasks: { title: string; tasks: Task[] }[] | undefined =
    useMemo(() => {
      if (mode === "none") {
        return;
      }

      if (mode === "byDate") {
        const today = new Date();
        const weekEnd = new Date();
        weekEnd.setDate(today.getDate() + 7);

        const groups = {
          today: [] as Task[],
          week: [] as Task[],
          future: [] as Task[],
        };

        filteredTasks.forEach((task) => {
          const finishDate = new Date(task.dueDate);
          finishDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          if (finishDate.getTime() === today.getTime()) {
            groups.today.push(task);
          } else if (finishDate > today && finishDate <= weekEnd) {
            groups.week.push(task);
          } else if (finishDate > weekEnd) {
            groups.future.push(task);
          }
        });

        return [
          { title: "Сегодня:", tasks: groups.today },
          { title: "На этой неделе:", tasks: groups.week },
          { title: "Больше, чем на неделю:", tasks: groups.future },
        ];
      }

      if (mode === "byResponsible" && isManager) {
        // Группировка по ответственным
        const groups = {} as Record<string, Task[]>;
        filteredTasks.forEach((task) => {
          const responsibleName = getFullName(task.assignee);
          if (!groups[responsibleName]) {
            groups[responsibleName] = [];
          }
          groups[responsibleName].push(task);
        });
        return Object.entries(groups).map(([name, tasks]) => ({
          title: name,
          tasks,
        }));
      }
    }, [filteredTasks, mode, isManager]);

  return (
    <div className={classNames(cls.TaskList, {}, [className])}>
      {mode === "none" ? (
        <>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} updateTask={updateTask} />
          ))}
        </>
      ) : (
        groupedTasks?.map((group) => (
          <TaskSection key={group.title} title={group.title}>
            {group.tasks.length > 0 ? (
              group?.tasks.map((task) => (
                <TaskCard key={task.id} task={task} updateTask={updateTask} />
              ))
            ) : (
              <span>Нет задач</span>
            )}
          </TaskSection>
        ))
      )}
    </div>
  );
});
