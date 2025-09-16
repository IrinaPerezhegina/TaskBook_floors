import { memo } from "react";

import { Button } from "@/shared";

import cls from "./FilterWidget.module.scss";

interface FilterWidgetProps {
  mode: "none" | "byDate" | "byResponsible";
  onChange: (mode: "none" | "byDate" | "byResponsible") => void;
  isManager: boolean;
}

export const FilterWidget = memo((props: FilterWidgetProps) => {
  const { isManager, mode, onChange } = props;

  const handleClick = (newMode: "none" | "byDate" | "byResponsible") => {
    if (mode !== newMode) {
      onChange(newMode);
    }
  };

  return (
    <div className={cls.FilterWidget}>
      <Button
        text={"Без группировки"}
        className={mode === "none" ? cls.active : ""}
        variant={mode === "none" ? "filled" : "clear"}
        onClick={() => handleClick("none")}
      />
      <Button
        text={"По дате"}
        variant={mode === "byDate" ? "filled" : "clear"}
        onClick={() => handleClick("byDate")}
      />
      {!isManager && (
        <Button
          text={"По ответственным"}
          variant={mode === "byResponsible" ? "filled" : "clear"}
          onClick={() => handleClick("byResponsible")}
        />
      )}
    </div>
  );
});
