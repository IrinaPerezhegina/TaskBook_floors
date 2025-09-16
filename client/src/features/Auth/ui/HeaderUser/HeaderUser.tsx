import { getAuthUser } from "@/features/Auth/model/selectors/authUserSelector";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button, classNames, getFullName } from "@/shared";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router";
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
