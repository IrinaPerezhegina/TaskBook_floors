import { memo, useCallback } from "react";
import { useNavigate } from "react-router";

import { Button, classNames, getFullName } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/hooks";
import { getAuthUser } from "../../model/selectors/authUserSelector";
import { authActions } from "../../model/slice/authSlice";

import cls from "./HeaderUser.module.scss";

interface HeaderUserProps {
  className?: string;
}

export const HeaderUser = memo((props: HeaderUserProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthUser);
  const navigate = useNavigate();
  console.log(user);

  const onLogout = useCallback(async () => {
    dispatch(authActions.logout());
    navigate("/login");
  }, [dispatch, navigate]);

  if (!user) {
    return;
  }

  return (
    <div className={classNames(cls.HeaderUser, {}, [className])}>
      <div className={cls.HeaderText}>
        |{" "}
        {getFullName({
          firstName: user?.firstName,
          lastName: user?.lastName,
          middleName: user?.middleName,
        })}
      </div>
      <div className="">
        <Button variant="filled" onClick={onLogout} text="Выйти" />
      </div>
    </div>
  );
});
