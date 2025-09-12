import { Outlet } from "react-router-dom"
import HeaderSecondary from "./HeaderSecondary"
import pageStyle from "./MainLayout.module.css"

export default function HeaderOnlyLayout() {
  return (
    <div className={pageStyle.layout}>
      <HeaderSecondary />
      <main>
        <Outlet />
      </main>
    </div>
  )
}