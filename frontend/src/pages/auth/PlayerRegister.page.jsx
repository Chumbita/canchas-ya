import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  startAuthTransition,
  clearAuthTransition,
} from "../../utils/authTransitions";
import { useAuth } from "../../context/AuthContext";
import { useUserRegistration } from "../../hooks/useRegistration";
import FileUpload from "../../components/common/FileUpload";
import pageStyle from "./ClubRegister.module.css";
import textStyle from "../../styles/base/Text.module.css";
import inputStyle from "../../styles/base/Inputs.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import ProgressivePrimaryBtn from "../../components/common/ProgressivePrimaryBtn";

export default function PlayerRegister() {
  const { user } = useAuth();
  const { registerPlayerApi, loading, error } = useUserRegistration();
  const [playerDraft, setPlayerDraft] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handlePlayerChange = (field, value) => {
    setPlayerDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfilePhotoChange = (field, value) => {
    setProfilePhoto(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startAuthTransition();

    const registrationDraft = {
      player: playerDraft,
      profilePhoto: profilePhoto,
    };

    try {
      await registerPlayerApi(registrationDraft);
      navigate("/player/create-account/success");
    } catch (error) {
      console.error("Error during registration:", error);
      clearAuthTransition();
    }
  };

  return (
    <div className={pageStyle["content"]}>
      <div className={pageStyle["registration"]}>
        <form type="submit" onSubmit={handleSubmit}>
          <section className={pageStyle["registration-header"]}>
            <h3
              className={`${textStyle["text-primary"]} ${textStyle["text-base"]} ${textStyle["text-bold"]}`}
            >
              Validamos cada jugador para garantizar una experiencia segura
            </h3>
            <p
              className={`${textStyle["text-secondary"]} ${textStyle["text-sm"]} ${textStyle["text-regular"]}`}
            >
              Completá los datos iniciales para que podamos verificar tu
              identidad y activar tu perfil en la plataforma.
            </p>
          </section>
          <section className={pageStyle["registration-section"]}>
            <p
              className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-semibold"]}`}
            >
              Datos del jugador
            </p>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Nombre
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: Carlos"
                name="firstName"
                required
                onChange={(e) =>
                  handlePlayerChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Apellido
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: Olivera"
                name="lastName"
                required
                onChange={(e) =>
                  handlePlayerChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Email
                <span
                  className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
                >
                  {" "}
                  (para iniciar sesión)
                </span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                value={user?.email || ""}
                disabled
                name="email"
                required
                onChange={(e) =>
                  handlePlayerChange(e.target.name, e.target.value)
                }
              />
            </div>
          </section>
          <section className={pageStyle["registration-section"]}>
            <p
              className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-semibold"]}`}
            >
              Foto de perfil
              <span
                className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
              >
                {" "}
                (opcional)
              </span>
            </p>
            <div className={pageStyle["registration-section__field"]}>
              <FileUpload 
                name={"profilePhoto"} 
                onChange={handleProfilePhotoChange} 
              />
            </div>
          </section>
          <ProgressivePrimaryBtn label="Enviar" loading={loading} />
        </form>
      </div>
    </div>
  );
}
