import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./components/pages/Auth/signin/SignIn";
import SignUp from "./components/pages/Auth/signup/SignUp";
import UserVerification from "./components/pages/Auth/verification/UserVerification";
import ForgetPassword from "./components/pages/Auth/forgetPassword/ForgetPassword";
import ResetPassword from "./components/pages/Auth/resetPassword/ResetPassword";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/pages/page/dashboard/Dashboard";
import Profile from "./components/pages/page/profile/profile/Profile";
import UpdateProfile from "./components/pages/page/profile/update/UpdateProfile";
import ChangePassword from "./components/pages/page/changePassword/ChangePassword";
import Payment from "./components/pages/page/subscription/Payment";
import ProtectedRoute from "./components/pages/protectedRoute/ProtectedRoute";

function App() {
  const ProtectedRoutes = ProtectedRoute();

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/verify/:verificationToken"
          element={<UserVerification />}
        />
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
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/update/:id"} element={<UpdateProfile />} />
          <Route path={"/changepassword/:id"} element={<ChangePassword />} />
          <Route path={"/payment"} element={<Payment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
