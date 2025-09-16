import { classNames } from "@/shared";
import { memo } from "react";
import cls from "./Task.module.scss";

interface TaskProps {
  className?: string;
}

export const Task = memo((props: TaskProps) => {
  const { className } = props;

  return <div className={classNames(cls.Task, {}, [className])}></div>;
});
