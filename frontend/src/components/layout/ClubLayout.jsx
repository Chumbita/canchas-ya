import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import pageStyle from "./ClubLayout.module.css"

export default function ClubLayout() {
  return (
    <div className={pageStyle.layout}>
      <Sidebar />
      <main className={pageStyle.mainContent}>
        <Outlet />
      </main>
    </div>
  )
}
