import { memo } from "react";

import { classNames } from "@/shared/lib/helper";

import cls from "./Error.module.scss";

interface ErrorProps {
  error: string | undefined;
  className?: string;
}

export const Error = memo((props: ErrorProps) => {
  const { className, error } = props;
  if (!error) {
    return;
  }
  return <div className={classNames(cls.Error, className)}>{error}</div>;
});
