import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeaderOnlyLayout from "../components/layout/HeaderOnlyLayout";
import Home from "../pages/home/Home.page";
import SearchResults from "../pages/search/SearchResults.page";
import CourtDetail from "../pages/court/CourtDetail.page";
import Step1Configuration from "../pages/reservation/Step1Configuration.page";
import Step2Payment from "../pages/reservation/Step2Payment.page";
import Step3Confirmation from "../pages/reservation/Step3Confirmation.page";
import ClubLogin from "../pages/auth/ClubLogin.page";
import ClubRegister from "../pages/auth/ClubRegister.page";
import VerifyOtp from "../pages/auth/VerifyOtp.page";
import RegistrationSuccess from "../pages/club/RegistrationSuccess.page";

import PlayerLogin from "../pages/auth/PlayerLogin.page";
import PlayerRegister from "../pages/auth/PlayerRegister.page.jsx";

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
          <Route path="/search" element={<SearchResults />}/>
          <Route path="/court/:id" element={<CourtDetail />}/>
          <Route path="/reservation/:courtId/configuration" element={<Step1Configuration />}/>
          <Route path="/reservation/:courtId/payment" element={<Step2Payment />}/>
          <Route path="/reservation/:courtId/confirmation" element={<Step3Confirmation />}/>
        </Route>
        <Route element={<HeaderOnlyLayout />}>
          <Route path="/club/login" element={<ClubLogin />}/>
          <Route element={<OtpGuard />}>
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Route>
          <Route element={<RegisterGuard />}>
            <Route path="/club/create-account" element={<ClubRegister />} />
            <Route path="/club/create-account/success" element={<RegistrationSuccess />} />
            <Route path="/player/create-account" element={<PlayerRegister />} />
          </Route>
          <Route path="/player/login" element={<PlayerLogin />} />
        </Route>
      </Routes>
    </div>
  );
}
