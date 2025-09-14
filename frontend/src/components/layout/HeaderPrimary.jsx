import { useNavigate } from "react-router-dom";
import pageStyle from "./HeaderPrimary.module.css";
import textStyle from "../../styles/base/Text.module.css";
import btnStyle from "../../styles/base/Button.module.css";

export default function HeaderPrimary() {
  const navigate = useNavigate();

  return (
    <div className={pageStyle.header}>
      <div className={pageStyle.content}>
        <h1
          className={`${textStyle["text-primary"]} ${textStyle["text-lg"]} ${textStyle["text-extra-bold"]}`}
        >
          CanchasYa
        </h1>
        <div className={pageStyle["header-buttons"]}>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]}`}
            onClick={() => navigate("club/login")}
          >
            Gestionar club
          </button>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]} ${btnStyle["btn-primary"]}`}
            onClick={() => navigate("player/login")}
          >
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
}
