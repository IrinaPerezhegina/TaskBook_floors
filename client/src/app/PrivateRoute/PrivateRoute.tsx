import { Navigate, Outlet } from "react-router-dom";

import { getAuthUser, getAuthUserLoading } from "@/features/Auth";
import { Loader } from "@/shared";
import { useAppSelector } from "@/shared/lib/hooks/hooks";

interface PrivateRouteProps {
  link: string;
  auth: boolean;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { link, auth } = props;

  const isAuthenticated = Boolean(useAppSelector(getAuthUser));
  const loading = useAppSelector(getAuthUserLoading);

  if (loading) {
    return <Loader isLoading={loading} variant={"bigLoader"} />;
  }

  return isAuthenticated === auth ? <Outlet /> : <Navigate to={link} />;
};
