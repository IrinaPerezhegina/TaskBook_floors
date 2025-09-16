import { memo } from "react";

import cls from "./Loader.module.scss";

export type LoaderSize = "smallLoader" | "bigLoader";

interface LoaderProps {
  variant?: LoaderSize;
  text?: string;
}

export const Loader = memo((props: LoaderProps) => {
  const { variant = "smallLoader" } = props;
  const result =
    variant === "smallLoader" ? cls.LoaderWrapSmall : cls.LoaderWrapBig;
  return (
    <div className={result}>
      <div className={cls[variant]} />
    </div>
  );
});
