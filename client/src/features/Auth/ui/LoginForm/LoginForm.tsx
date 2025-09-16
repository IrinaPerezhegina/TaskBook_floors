import { memo, useCallback } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/hooks/hooks";
import { Button, classNames, Input, Loader, Text } from "@/shared";

import { loginUser } from "../../model/services/loginUser/loginUser";
import { authActions } from "../../model/slice/authSlice";

import { useNavigate } from "react-router";
import {
  getLoginError,
  getLoginIsLoading,
  getLoginPassword,
  getLoginUsername,
} from "../../model/selectors/loginSelectors";
import cls from "./LoginForm.module.scss";

interface LoginFormProps {
  name: string;
  onSwitchToRegisterForm: () => void;
  className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
  const { className, name, onSwitchToRegisterForm } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(getLoginError);
  const loading = useSelector(getLoginIsLoading);
  const login = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(authActions.setUsername(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(authActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async () => {
    const response = await dispatch(loginUser({ password, login }));

    if (response.meta.requestStatus !== "rejected") {
      dispatch(authActions.resetUser());
      navigate("/tasks");
    }
  }, [dispatch, login, password, navigate]);

  return (
    <>
      <div className={classNames(cls.LoginForm, className)}>
        <Button
          className={cls.LoginSwitcher}
          variant={"outline"}
          onClick={onSwitchToRegisterForm}
          text="Переключиться на форму регистарции"
        />
        <h1>{name}</h1>

        <Input
          required
          placeholder="Введите имя пользователя..."
          onChange={onChangeUsername}
          name="login"
          label="Логин"
          value={login}
        />
        <Input
          required
          type={"password"}
          placeholder="Введите пароль"
          name="password"
          value={password}
          label="Пароль"
          onChange={onChangePassword}
        />
        <div className={cls.wrapperComponents}>
          {loading && <Loader variant="smallLoader" />}
          {error && <Text text={error} />}
        </div>
        <Button onClick={onLoginClick} text="Войти" />
      </div>
    </>
  );
});
