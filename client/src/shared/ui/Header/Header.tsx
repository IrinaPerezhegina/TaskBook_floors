import { memo, PropsWithChildren, ReactNode } from "react";

import { classNames } from "@/shared/lib";

import cls from "./Header.module.scss";

interface HeaderProps {
  children?: ReactNode;
}

export const Header = memo((props: PropsWithChildren<HeaderProps>) => {
  const { children } = props;
  return (
    <div className={classNames(cls.Header)}>
      <img src="/assets/logo-black.svg" />
      {children}
    </div>
  );
});
