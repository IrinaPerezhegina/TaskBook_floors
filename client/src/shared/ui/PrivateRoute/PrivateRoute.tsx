import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getAuthUser, getAuthUserLoading } from "@/features/Auth";
import { useAppSelector } from "@/hooks/hooks";
import { Loader } from "@/shared";

interface PrivateRouteProps {
  link: string;
  auth: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  link,
  auth,
}: PrivateRouteProps) => {
  const isAuthenticated = Boolean(useAppSelector(getAuthUser));
  const loading = useAppSelector(getAuthUserLoading);

  if (loading) {
    return <Loader variant={"bigLoader"} />;
  }
  return isAuthenticated === auth ? <Outlet /> : <Navigate to={link} />;
};
