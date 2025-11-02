import { NavLink } from "react-router-dom";
import { Calendar, ChartNoAxesCombined, Trophy, House, UserRoundCog   } from "lucide-react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const menuItems = [
    { id: 1, label: "Inicio", icon: House, path: "/club/dashboard" },
    { id: 2, label: "Turnos", icon: Calendar, path: "/" },
    { id: 3, label: "Deportes", icon: Trophy , path: "/court-page" },
    { id: 4, label: "Reportes", icon: ChartNoAxesCombined, path: "/" },
    { id: 5, label: "Mi club", icon: UserRoundCog  , path: "/club/status" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h1 className={`${styles["text-primary"]} ${styles["text-lg"]} ${styles["text-bold"]} ${styles.logoTitle}`}>
  CanchasYa
</h1>

      </div>

      <nav className={styles.sidebarNav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
            >
              <Icon className={styles.navIcon} strokeWidth={1.5}/>
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
