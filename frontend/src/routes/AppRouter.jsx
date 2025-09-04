import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import ClubLoginPage from "../pages/Login/ClubLoginPage";
import ClubRegisterPage from "../pages/Register/ClubRegisterPage";
import HomePage from "../pages/home/HomePage";

export default function AppRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/club" element={<ClubLoginPage />} />
        <Route path="/register/club" element={<ClubRegisterPage />} />
        <Route
          path="/club/"
          element={<PrivateRoutes role="club"></PrivateRoutes>}
        />
        <Route
          path="/player/"
          element={<PrivateRoutes role="player"></PrivateRoutes>}
        />
      </Routes>
    </div>
  );
}
