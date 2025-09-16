import React, { useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { getAuthUserLoading, initAuthUser } from "@/features/Auth";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import LoginPage from "@/pages/LoginPage/LoginPage";
import { TasksPage } from "@/pages/TasksPage/TasksPage";
import { Loader, PrivateRoute } from "@/shared";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getAuthUserLoading);
  // console.log(isAuthenticated);

  useEffect(() => {
    dispatch(initAuthUser());
  }, [dispatch]);

  if (loading) {
    return <Loader variant={"bigLoader"} />;
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

        <Route path="*" element={<Navigate to={"/login"}/>} />
      </Routes>
    </Router>
  );
};

export default App;
//  <Routes>
//         <Route path={""} element={<Main />} />
//         <Route path={"/articles/:id"} element={<Article />} />
//         <Route element={<ProtectedRoutes auth={true} link={"/login"} />}>
//           <Route path={"/profile"} element={<Profile />} />
//         </Route>
//         <Route element={<ProtectedRoutes auth={false} />}>
//           <Route path={"/login"} element={<Login />} />
//         </Route>
//       </Routes>
