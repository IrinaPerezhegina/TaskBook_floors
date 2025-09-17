import { memo } from "react";

import { classNames } from "@/shared/lib";

import cls from "./TextArea.module.scss";

interface TextareaProps {
  name: string;
  value: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Textarea = memo((props: TextareaProps) => {
  const {
    name,
    label,
    value,
    onChange,
    className,
    readOnly = false,
    required = false,
    placeholder = "",
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(cls.textareaWrapper, className)}>
      <div className={cls.textareaWrapper}>
        <div>
          <span>{label}</span>
          {required && <span className={cls.required}>*</span>}
        </div>
        <textarea
          className={classNames({ [cls.readOnly]: readOnly })}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
});
