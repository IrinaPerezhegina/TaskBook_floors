import { memo } from "react";

import { classNames } from "@/shared/lib";

import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const { className, onClick, text, variant = "clear" } = props;

  return (
    <div className={classNames(cls.Button, {}, [className])}>
      <button
        className={classNames(cls[variant])}
        type="button"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
});
