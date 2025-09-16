import { classNames } from "@/shared";
import { PropsWithChildren } from "react";
import cls from "./TaskSection.module.scss";

interface TaskSectionProps {
  title: string;
}

export const TaskSection = (props: PropsWithChildren<TaskSectionProps>) => {
  const { title, children } = props;
  return (
    <div className={classNames(cls.TaskSection)}>
      <div className={cls.Title}>
        <h3>{title}</h3>
      </div>
      <div className={cls.Children}>{children}</div>
    </div>
  );
};
