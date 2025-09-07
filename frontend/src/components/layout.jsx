import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="wrap">
      <Header />
      <main className="main">
        <Outlet /> {/* Aquí se cargan las páginas */}
      </main>
      <Footer />
    </div>
  );
}
