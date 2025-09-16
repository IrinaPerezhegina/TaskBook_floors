import { type ReactNode } from "react";

import { Footer } from "@/shared/ui/Footer/Footer";
import { Header } from "@/shared/ui/Header/Header";

import cls from "./PageLayout.module.scss";

interface PageLayoutProps {
  head?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({
  head = <Header />,
  footer = <Footer />,
  children,
}: PageLayoutProps) => {
  return (
    <div className={cls.PageLayout}>
      <div className={cls.head}>{head}</div>
      <div className={cls.center}>{children}</div>
      <div className={cls.footer}>{footer}</div>
    </div>
  );
};
