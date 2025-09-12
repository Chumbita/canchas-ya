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
          className={`${textStyle["text-primary"]} ${textStyle["text-2xl"]} ${textStyle["text-extra-bold"]}`}
        >
          Canchas Ya
        </h1>
        <div className={pageStyle["header-buttons"]}>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]}`}
            onClick={() => navigate("/login/club")}
          >
            Gestionar club
          </button>
          <button
            className={`${btnStyle["btn"]} ${btnStyle["btn-circle"]} ${btnStyle["btn-primary"]}`}
          >
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
}
