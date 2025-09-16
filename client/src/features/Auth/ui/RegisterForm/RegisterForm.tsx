import {
  fetchUsersForRegister,
  getErrorUsersForRegister,
  getLoadingUsers,
  getUsersForRegister,
} from "@/entities/User";
import { authActions } from "@/features/Auth/model/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  Button,
  classNames,
  getFullName,
  Input,
  Loader,
  Select,
  Text,
} from "@/shared";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { registerUser } from "../../model/services/registerUser/registerUser";

import { useNavigate } from "react-router";
import {
  getRegisterError,
  getRegisterFirstName,
  getRegisterLastName,
  getRegisterLoading,
  getRegisterLogin,
  getRegisterManagerId,
  getRegisterMiddleName,
  getRegisterPassword,
} from "../../model/selectors/registerSelectors";
import cls from "./RegisterForm.module.scss";

interface RegisterFormProps {
  name: string;
  onSwitchToLoginForm: () => void;
  className?: string;
}

export const RegisterForm = memo((props: RegisterFormProps) => {
  const { className, name, onSwitchToLoginForm } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useSelector(getUsersForRegister);
  const selectedManagerId = useSelector(getRegisterManagerId);
  const firstName = useSelector(getRegisterFirstName);
  const lastName = useSelector(getRegisterLastName);
  const middleName = useSelector(getRegisterMiddleName);
  const login = useSelector(getRegisterLogin);
  const password = useSelector(getRegisterPassword);
  const loadingUsers = useSelector(getLoadingUsers);
  const errorUsers = useSelector(getErrorUsersForRegister);
  const loading = useSelector(getRegisterLoading);
  const error = useAppSelector(getRegisterError);

  useEffect(() => {
    dispatch(fetchUsersForRegister());
  }, [dispatch]);

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(authActions.setPassword(value));
    },
    [dispatch]
  );
  const onChangeLogin = useCallback(
    (value: string) => {
      dispatch(authActions.setUsername(value));
    },
    [dispatch]
  );
  const onChangeFirstName = useCallback(
    (value: string) => {
      dispatch(authActions.setFirstName(value));
    },
    [dispatch]
  );

  const onChangeLastName = useCallback(
    (value: string) => {
      dispatch(authActions.setLastName(value));
    },
    [dispatch]
  );
  const onChangeMiddleName = useCallback(
    (value: string) => {
      dispatch(authActions.setMiddleName(value));
    },
    [dispatch]
  );
  const onRegisterClick = useCallback(async () => {
    const response = await dispatch(
      registerUser({
        password,
        login,
        firstName,
        middleName,
        lastName,
        managerId: selectedManagerId,
      })
    );
    if (response.meta.requestStatus !== "rejected") {
      dispatch(authActions.resetUser());
      navigate("/tasks");
    }
  }, [
    navigate,
    dispatch,
    password,
    login,
    firstName,
    middleName,
    lastName,
    selectedManagerId,
  ]);

  const onSelectedManagerId = useCallback(
    (value: string) => {
      dispatch(authActions.setManagerId(Number(value)));
    },
    [dispatch]
  );

  const options = useMemo(() => {
    return users.map((user) => ({
      value: user.id,
      content: getFullName(user),
    }));
  }, [users]);

  return (
    <div className={classNames(cls.RegisterForm, className)}>
      <Button
        className={cls.LoginSwitcher}
        onClick={onSwitchToLoginForm}
        text="Переключиться на форму входа"
        variant="outline"
      />
      <h1>{name}</h1>
      <Input
        required
        placeholder="Введите имя пользователя..."
        onChange={onChangeFirstName}
        name="firstName"
        label="Имя"
        value={firstName}
      />
      <Input
        required
        placeholder="Введите фамилию пользователя..."
        onChange={onChangeLastName}
        name="lastName"
        label="Фамилия"
        value={lastName}
      />
      <Input
        placeholder="Введите отчество пользователя..."
        onChange={onChangeMiddleName}
        name="middleName"
        label="Отчество"
        value={middleName}
      />
      <Input
        required
        placeholder="Введите логин"
        onChange={onChangeLogin}
        name="login"
        label="Логин"
        value={login}
      />
      <Input
        required
        type="password"
        placeholder="Введите пароль"
        name="password"
        value={password}
        label="Пароль"
        onChange={onChangePassword}
      />
      <Select
        value={selectedManagerId}
        onChange={onSelectedManagerId}
        options={options}
        label="Выберите руководителя"
        placeholder="Выберите руководителя..."
      />
      <div className={cls.wrapperComponents}>
        {(loading || loadingUsers) && <Loader />}
        {error && <Text text={error} />}
        {errorUsers && <Text text={errorUsers} />}
      </div>
      <Button onClick={onRegisterClick} text="Зарегистрироваться" />
    </div>
  );
});
