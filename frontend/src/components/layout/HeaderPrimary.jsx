import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import pageStyle from "./HeaderPrimary.module.css";
import textStyle from "../../styles/base/Text.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import logoutIcon from "../../assets/icons/logout-icon.svg";
import profileIcon from "../../assets/icons/user-icon.svg";
import expandArrowIcon from "../../assets/icons/expand-arrow-icon.png";
import MenuOverlay from "./MenuOverlay";

export default function HeaderPrimary() {
  const [isOpen, setIsOpen] = useState(false); // estado para el menú mobile
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const isUserIncomplete =
    (role === "player" && !user?.first_name) ||
    (role === "club" && !user?.name);

  if (isUserIncomplete) {
    // Si estás en una ruta distinta al registro, redirigilo automáticamente
    if (role === "player") navigate("/player/create-account");
    if (role === "club") navigate("/club/create-account");
  }

  const toggleDropdown = () => {
    const dropdownMenu = document.querySelector(
      `.${pageStyle["dropdown-menu"]}`
    );
    const expandArrow = document.querySelector(
      `.${pageStyle["expand-arrow-icon"]}`
    );
    if (dropdownMenu.classList.contains(pageStyle.active)) {
      dropdownMenu.classList.remove(pageStyle.active);
      expandArrow.classList.remove(pageStyle.open);
    } else {
      dropdownMenu.classList.add(pageStyle.active);
      expandArrow.classList.add(pageStyle.open);
    }
  };
  // Cierre de sesión y redirección
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log(user);

  return (
    <div className={pageStyle.header}>
      <div className={pageStyle.content}>
        <h1
          className={`${textStyle["text-primary"]} ${textStyle["text-lg"]} ${textStyle["text-bold"]}`}
        >
          CanchasYa
        </h1>

        {/* Si el usuario ya está logueado, mostrar avatar y menú */}
        {user ? (
          <div className={pageStyle["header-user"]}>
            <div className={pageStyle["user-icon__circle"]}>
              <p>
                {role === "player"
                  ? user?.first_name?.charAt(0) || "?"
                  : user?.name?.charAt(0) || "?"}
              </p>
            </div>
            <span
              className={`${textStyle["text-sm"]} ${textStyle["text-primary"]} ${textStyle["text-medium"]}`}
            >
              {role === "player"
                ? user?.first_name || "Usuario"
                : user?.name || "Club"}
            </span>

            {/* Dropdown de usuario */}
            <div className={pageStyle["dropdown"]}>
              <button
                onClick={toggleDropdown}
                className={pageStyle["expand-arrow-button"]}
                aria-label="Toggle user menu"
              >
                <i className={pageStyle["expand-arrow-icon"]}>
                  <img src={expandArrowIcon} alt="" />
                </i>
              </button>
              <ul className={pageStyle["dropdown-menu"]}>
                <li>
                  <i>
                    <img src={profileIcon} alt="" />
                  </i>
                  <a href="">Ver perfil</a>
                </li>
                <li className={pageStyle["user-icon__logout"]}>
                  <i>
                    <img src={logoutIcon} alt="" />
                  </i>
                  <a onClick={handleLogout}>Cerrar sesión</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={pageStyle["header-buttons"]}>
            {/* Botones visibles en desktop */}
            <nav className={pageStyle["desktop-menu"]}>
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
            </nav>

            {/* Botón visible solo en mobile */}
            <button
              className={pageStyle["hamburger"]}
              onClick={() => setIsOpen(true)}
              aria-label="Abrir menú"
            >
              <span />
              <span />
              <span />
            </button>
            {isOpen && <MenuOverlay onClose={() => setIsOpen(false)} />}
          </div>
        )}
      </div>
    </div>
  );
}
