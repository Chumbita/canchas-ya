import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  startAuthTransition,
  clearAuthTransition,
} from "../../utils/authTransitions";
import { useAuth } from "../../context/AuthContext";
import { usePlayerService } from "../../hooks/usePlayerService";
import pageStyle from "./PlayerRegister.module.css";
import textStyle from "../../styles/base/Text.module.css";
import inputStyle from "../../styles/base/Inputs.module.css";
import ProgressivePrimaryBtn from "../../components/common/ProgressivePrimaryBtn";
import userProfile from "../../assets/images/user-profile.png";

export default function PlayerRegister() {
  const { user, setUser, token } = useAuth();
  const { loading, registerPlayerApi } = usePlayerService();
  const [playerDraft, setPlayerDraft] = useState({
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handlePlayerChange = (field, value) => {
    setPlayerDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startAuthTransition();

    const registrationDraft = {
      player: {
        email: user.email,
        firstName: playerDraft.firstName,
        lastName: playerDraft.lastName,
      }
    };

    try {
      const res = await registerPlayerApi(registrationDraft, token);
      if (res){ 
        navigate("/");
        setUser(res);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      clearAuthTransition();
    }
  };

  return (
    <div className={pageStyle["content"]}>
      <div className={pageStyle["registration"]}>
        <form type="submit" onSubmit={handleSubmit}>
          {/* Avatar Section */}
          <section className={pageStyle["registration-section"]}>
            <div className={pageStyle["avatar-container"]}>
              <div className={pageStyle["avatar-icon"]}>
                <img 
                  src={userProfile} 
                  alt="Avatar" 
                  width="40" 
                  height="40"
                />
              </div>
            </div>
          </section>

          {/* Form Fields */}
          <section className={pageStyle["registration-section"]}>
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
          </section>
          <ProgressivePrimaryBtn label="Continuar" loading={loading} />
        </form>
      </div>
    </div>
  );
}
