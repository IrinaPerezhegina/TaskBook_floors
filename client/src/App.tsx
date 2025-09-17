import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { getAuthUserLoading, initAuthUser } from "@/features/Auth";
import { LoginPage } from "@/pages/LoginPage";
import TasksPage from "@/pages/TasksPage/ui/TasksPage";
import { Loader } from "@/shared";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/hooks";
import { PrivateRoute } from "@/app/PrivateRoute";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getAuthUserLoading);

  useEffect(() => {
    dispatch(initAuthUser());
  }, [dispatch]);

  if (loading) {
    return <Loader isLoading={loading} variant={"bigLoader"} />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute link={"/login"} auth={true} />}>
          <Route path={"/tasks"} element={<TasksPage />} />
        </Route>
        <Route element={<PrivateRoute link={"/tasks"} auth={false} />}>
          <Route path={"/login"} element={<LoginPage />} />
        </Route>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
