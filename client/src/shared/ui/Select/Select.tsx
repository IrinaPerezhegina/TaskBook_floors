import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ReactComponent as ArrowDown } from "@/assets/arrowDown.svg";
import { ReactComponent as ArrowUp } from "@/assets/arrowUp.svg";
import { classNames } from "@/shared/lib/helper";

import cls from "./Select.module.scss";

export interface SelectOption {
  value: string | number;
  content: string;
}

export interface SelectOptionContentProps {
  value: string | undefined;
}

export const DefaultSelectOptionContent = (props: SelectOptionContentProps) => {
  return <>{props.value}</>;
};

interface SelectProps {
  value: string | number | null | undefined;
  onChange: (value: string) => void;
  readOnly?: boolean;
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  SelectOptionContentComponent?: React.FC<SelectOptionContentProps>;
}

export const Select = memo((props: SelectProps) => {
  const {
    options,
    onChange,
    value,
    label,
    readOnly,
    placeholder = "",
    SelectOptionContentComponent = DefaultSelectOptionContent,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return options?.find((option) => option.value === value);
  }, [options, value]);

  // Закрывать список при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as HTMLDivElement)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOpen = () => {
    if (readOnly) return;
    setIsOpen(!isOpen);
  };

  // Обработчик клика по компоненту списка выбора селекта
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLDivElement;
      const selected = options?.find((el) => String(el.value) === target.id);

      if (selected) {
        if (onChange) {
          onChange(String(selected.value));
        }
        setIsOpen(false);
      }
    },
    [options, onChange]
  );

  const optionsList = useMemo(() => {
    return options?.map((option) => {
      if (option.value === value) {
        return;
      }

      return (
        <div
          id={String(option.value)}
          key={option.value}
          className={cls.option}
        >
          <SelectOptionContentComponent value={option.content} />
        </div>
      );
    });
  }, [options, value, SelectOptionContentComponent]);

  return (
    <div ref={containerRef} className={classNames(cls.wrapper)}>
      <span>{label}</span>
      <div className={cls.header} onClick={toggleOpen}>
        <div className={cls.headerWrapper}>
          {value ? (
            <SelectOptionContentComponent value={selectedOption?.content} />
          ) : (
            placeholder
          )}
        </div>

        {isOpen ? (
          <ArrowDown className={cls.arrow} />
        ) : (
          <ArrowUp className={cls.arrow} />
        )}
      </div>

      {isOpen && (
        <div onClick={handleClick} className={cls.optionsContainer}>
          {optionsList}
        </div>
      )}
    </div>
  );
});
