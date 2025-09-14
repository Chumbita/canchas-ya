import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeaderOnlyLayout from "../components/layout/HeaderOnlyLayout";
import Home from "../pages/home/Home.page";
import ClubLogin from "../pages/auth/ClubLogin.page";
import ClubRegister from "../pages/auth/ClubRegister.page";
import VerifyOtp from "../pages/auth/VerifyOtp.page";
import RegistrationSuccess from "../pages/club/RegistrationSuccess.page";

import PlayerLogin from "../pages/auth/PlayerLogin.page";

//GUARDS
import { OtpGuard } from "../guards/OtpGuard";
import { RegisterGuard } from "../guards/RegisterGuard";
import { PrivateClubGuard } from "../guards/PrivateClubGuard";
import { PrivatePlayerGuard } from "../guards/PrivatePlayerGuard";


export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}> 
          <Route path="/" element={<Home />}/>
        </Route>
        <Route element={<HeaderOnlyLayout />}>
          <Route path="/club/login" element={<ClubLogin />}/>
          <Route element={<OtpGuard />}>
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Route>
          <Route element={<RegisterGuard />}>
            <Route path="/club/create-account" element={<ClubRegister />} />
            <Route path="/club/create-account/success" element={<RegistrationSuccess />} />
          </Route>
          <Route path="/player/login" element={<PlayerLogin />} />
        </Route>
      </Routes>
    </div>
  );
}
