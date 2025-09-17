import { memo, PropsWithChildren } from "react";

import { classNames } from "@/shared/lib";

import cls from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  className?: string;
}

export const Modal = memo((props: PropsWithChildren<ModalProps>) => {
  const { className, isOpen, children } = props;
  if (!isOpen) return null;
  return (
    <div className={classNames(cls.Modal, {}, [className])}>
      <div className={cls.Content}>{children}</div>
    </div>
  );
});
