import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import pageStyle from "./HeaderPrimary.module.css";
import textStyle from "../../styles/base/Text.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import userIcon from "../../assets/icons/user-icon.png";
import profileIcon from "../../assets/icons/profile-icon.png";
import logoutIcon from "../../assets/icons/logout-icon.svg";
import expandArrowIcon from "../../assets/icons/expand-arrow-icon.png";

export default function HeaderPrimary() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const toggleDropdown = () => {
    const dropdownMenu = document.querySelector(`.${pageStyle["dropdown-menu"]}`);
    const expandArrow = document.querySelector(`.${pageStyle["expand-arrow-icon"]}`);
    if (dropdownMenu.classList.contains(pageStyle.active)) {
      dropdownMenu.classList.remove(pageStyle.active);
      expandArrow.classList.remove(pageStyle.open);
    } else {
      dropdownMenu.classList.add(pageStyle.active);
      expandArrow.classList.add(pageStyle.open);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  }


  return (
    <div className={pageStyle.header}>
      <div className={pageStyle.content}>
        <h1
          className={`${textStyle["text-primary"]} ${textStyle["text-lg"]} ${textStyle["text-extra-bold"]}`}
        >
          CanchasYa
        </h1>
        { user ? (
          <div className={pageStyle["header-user"]}>
            <div className={pageStyle["user-icon__circle"]}>
              <p>{user.name.charAt(0)}</p>
            </div>
            <span className={`${textStyle["text-sm"]} ${textStyle["text-primary"]} ${textStyle["text-medium"]}`}>{user.name}</span>
            <div className={pageStyle["dropdown"]}>
              <button onClick={toggleDropdown} className={pageStyle["expand-arrow-button"]} aria-label="Toggle user menu">
                <i className={pageStyle["expand-arrow-icon"]}><img src={expandArrowIcon} alt="" /></i>
              </button>
              <ul className={pageStyle["dropdown-menu"]}>
                <li><i><img src={profileIcon} alt="" /></i><a href="">Ver perfil</a></li>
                <li className={pageStyle["user-icon__logout"]}><i><img src={logoutIcon} alt="" /></i><a onClick={handleLogout}>Cerrar sesión</a></li>
              </ul>
            </div>
          </div>
        )
        : (
          <div className={pageStyle["header-buttons"]}>
            <button
              className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]}`}
              onClick={() => navigate("/club/login")}
            >
              Gestionar club
            </button>
            <button
              className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]} ${btnStyle["btn-primary"]}`}
              onClick={() => navigate("/player/login")}
            >
              Iniciar sesion
            </button>
          </div>
        )
      }
      </div>
    </div>
  );
}
