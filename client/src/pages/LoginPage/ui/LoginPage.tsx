import React, { useCallback, useState } from "react";

import { LoginForm, RegisterForm } from "@/features/Auth";
import { PageLayout } from "@/shared";

const LoginPage: React.FC = () => {
  const [isLogin, setIsisLogin] = useState(true);

  const onChangeForm = useCallback(() => {
    setIsisLogin((prev) => !prev);
  }, []);

  return (
    <>
      <PageLayout>
        {isLogin ? (
          <LoginForm name="Вход" onSwitchToRegisterForm={onChangeForm} />
        ) : (
          <RegisterForm name="Регистрация" onSwitchToLoginForm={onChangeForm} />
        )}
      </PageLayout>
    </>
  );
};
export default LoginPage;
