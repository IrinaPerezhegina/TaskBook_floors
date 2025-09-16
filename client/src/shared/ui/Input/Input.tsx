import { memo } from "react";

import { classNames } from "@/shared/lib/helper";

import cls from "./Input.module.scss";

export interface InputProps {
  name: string;
  value: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  type?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}
export const Input = memo((props: InputProps) => {
  const {
    name,
    label,
    value,
    onChange,
    className,
    readOnly = false,
    required = false,
    placeholder = "",
    type = "text",
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(cls.input, className)}>
      <div className={cls.inputWrapper}>
        <div>
          <span>{label}</span>
          {required && <span className={cls.required}>*</span>}
        </div>
        <input
          className={classNames({ [cls.readOnly]: readOnly })}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
});
