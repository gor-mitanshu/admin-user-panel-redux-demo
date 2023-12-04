import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/pages/Auth/signin/SignIn";
import ForgetPassword from "./components/pages/Auth/forgetPassword/ForgetPassword";
import ResetPassword from "./components/pages/Auth/resetPassword/ResetPassword";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/page/dashboard/Dashboard";
import Profile from "./components/pages/page/profile/profile/Profile";
import UpdateProfile from "./components/pages/page/profile/update/UpdateProfile";
import ChangePassword from "./components/pages/page/changePassword/ChangePassword";
import Users from "./components/pages/page/users/user/User";
import ViewUser from "./components/pages/page/users/view/ViewUser";
import UpdateUser from "./components/pages/page/users/update/UpdateUser";
import ProtectedRoute from "./components/pages/protectedRoute/ProtectedRoute";

function App() {
  const ProtectedRoutes = ProtectedRoute();
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path={"/dashboard"}
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/profile"}
            element={
              <ProtectedRoutes>
                <Profile />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/update/:id"}
            element={
              <ProtectedRoutes>
                <UpdateProfile />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/users"}
            element={
              <ProtectedRoutes>
                <Users />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/users/viewuser/:id"}
            element={
              <ProtectedRoutes>
                <ViewUser />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/users/updateuser/:id"}
            element={
              <ProtectedRoutes>
                <UpdateUser />{" "}
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/changepassword/:id"}
            element={
              <ProtectedRoutes>
                <ChangePassword />{" "}
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
