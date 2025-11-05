import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeaderOnlyLayout from "../components/layout/HeaderOnlyLayout";
import Home from "../pages/home/Home.page.jsx";
import SearchResults from "../pages/search/SearchResults.page";
import CourtDetail from "../pages/court/CourtDetail.page";
import Step1Configuration from "../pages/reservation/Step1Configuration.page";
import Step2Payment from "../pages/reservation/Step2Payment.page";
import Step3Confirmation from "../pages/reservation/Step3Confirmation.page";
import PaymentSuccess from "../pages/reservation/PaymentSuccess.page";
import PaymentFailure from "../pages/reservation/PaymentFailure.page";
import ClubLogin from "../pages/auth/ClubLogin.page";
import ClubRegister from "../pages/auth/ClubRegister.page";
import VerifyOtp from "../pages/auth/VerifyOtp.page";
import RegistrationSuccess from "../pages/club/RegistrationSuccess.page";
import CourtPage from "../pages/CourtPage.jsx";
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
            <Route path="/search" element={<SearchResults />} />
            <Route path="/court/:id" element={<CourtDetail />} />
            <Route
              path="/reservation/:courtId/configuration"
              element={<Step1Configuration />}
            />
            <Route
              path="/reservation/:courtId/payment"
              element={<Step2Payment />}
            />
            <Route
              path="/reservation/:courtId/confirmation"
              element={<Step3Confirmation />}
            />
            <Route path="/reservation/success" element={<PaymentSuccess />} />
            <Route
              path="/reservation/payment-failure"
              element={<PaymentFailure />}
            />
            <Route path="/club/status" element={<Status />} />
            <Route path="/court-page" element={<CourtPage />} />
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
