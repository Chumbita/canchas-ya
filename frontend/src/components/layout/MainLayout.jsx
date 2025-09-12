import { Outlet } from "react-router-dom"
import HeaderPrimary from "./HeaderPrimary"
import Footer from "./Footer"
import pageStyle from "./MainLayout.module.css"

export default function MainLayout() {
  return (
    <div className={pageStyle.layout}>
      <HeaderPrimary />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}