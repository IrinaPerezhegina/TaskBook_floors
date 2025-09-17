import { memo } from "react";

import { classNames } from "@/shared/lib";

import cls from "./Text.module.scss";

interface TextProps {
  text: string;
  className?: string;
}

export const Text = memo((props: TextProps) => {
  const { className, text } = props;

  return <div className={classNames(cls.Text, {}, [className])}>{text}</div>;
});
