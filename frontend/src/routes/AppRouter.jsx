import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeaderOnlyLayout from "../components/layout/HeaderOnlyLayout";
import Home from "../pages/home/Home.page.jsx";
import ClubLogin from "../pages/auth/ClubLogin.page";
import ClubRegister from "../pages/auth/ClubRegister.page";
import VerifyOtp from "../pages/auth/VerifyOtp.page";
import RegistrationSuccess from "../pages/club/RegistrationSuccess.page";
import Dashboard from "../pages/club/Dashboard.page";
import Status from "../pages/club/Status.page.jsx";

import PlayerLogin from "../pages/auth/PlayerLogin.page";
import PlayerRegister from "../pages/auth/PlayerRegister.page.jsx";

//GUARDS
import { OtpGuard } from "../guards/OtpGuard";
import { RegisterGuard } from "../guards/RegisterGuard";
import { PrivateClubGuard } from "../guards/PrivateClubGuard";
import { PrivatePlayerGuard } from "../guards/PrivatePlayerGuard";
import { RequiredCompleteProfileGuard } from "../guards/RequiredCompleteProfileGuard";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route element={<RequiredCompleteProfileGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/club/status" element={<Status />} />
            <Route element={<PrivateClubGuard requiredStatus={"active"} />}>
              <Route path="/club/dashboard/*" element={<Dashboard />} />
            </Route>
            <Route element={<PrivatePlayerGuard />}>
              {/* <Route path="/player/dashboard/*" element={<Dashboard />} />  */}
            </Route>
          </Route>
        </Route>
        <Route element={<HeaderOnlyLayout />}>
          <Route path="/club/login" element={<ClubLogin />} />
          <Route element={<OtpGuard />}>
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Route>
          <Route element={<RegisterGuard />}>
            <Route path="/club/create-account" element={<ClubRegister />} />
            <Route
              path="/club/create-account/success"
              element={<RegistrationSuccess />}
            />
            <Route path="/player/create-account" element={<PlayerRegister />} />
          </Route>
          <Route path="/player/login" element={<PlayerLogin />} />
        </Route>
      </Routes>
    </div>
  );
}
