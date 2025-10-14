import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  startAuthTransition,
  clearAuthTransition,
} from "../../utils/authTransitions";
import { useAuth } from "../../context/AuthContext";
import { useClubService } from "../../hooks/useClubService";
import FileUpload from "../../components/common/FileUpload";
import LocationPicker from "../../components/club/LocationPicker";
import pageStyle from "./ClubRegister.module.css";
import textStyle from "../../styles/base/Text.module.css";
import inputStyle from "../../styles/base/Inputs.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import ProgressivePrimaryBtn from "../../components/common/ProgressivePrimaryBtn";

export default function ClubRegister() {
  const { user, setUser } = useAuth();
  const { loading, registerClubApi } = useClubService();
  
  const [legalRepDraft, setLegalRepDraft] = useState({
    fullName: "",
    dni: "",
    cuil: "",
    email: user?.email || "",
  });
  const [clubInfoDraft, setClubInforDraft] = useState({
    name: "",
    location: "",
    cuit: "",
    businessName: "",
  });
  const [legalDocsDraft, setLegalDocsDraft] = useState({
    cuitCert: null,
    municipalAuth: null,
  });
  const navigate = useNavigate();

  const handleLegalRepChange = (field, value) => {
    setLegalRepDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleClubInfoChange = (field, value) => {
    setClubInforDraft((prev) => ({ ...prev, [field]: value }));
  };
  const handleLegalDocsChange = (field, value) => {
    setLegalDocsDraft((prev) => ({ ...prev, [field]: value }));
  };

  // Validación que todos los campos estén completos
  const isFormComplete = () => {
    const allLegalRepFilled = Object.values(legalRepDraft).every(
      (value) => value && value.trim() !== ""
    );

    const allClubInfoFilled = Object.entries(clubInfoDraft).every(
      ([key, value]) => {
        if (key === "location") return value && Object.keys(value).length > 0; // si location es un objeto (lat, lng)
        return value && value.trim() !== "";
      }
    );

    const allDocsUploaded = Object.values(legalDocsDraft).every(
      (file) => file !== null
    );

    return allLegalRepFilled && allClubInfoFilled && allDocsUploaded;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startAuthTransition();

    const registrationDraft = {
      legalRep: legalRepDraft,
      clubInfo: clubInfoDraft,
      legalDocs: legalDocsDraft,
    };

    try {
      const res = await registerClubApi(registrationDraft);
      if (res) {
        navigate("/club/create-account/success");
        setUser(res.user);
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
          <section className={pageStyle["registration-header"]}>
            <h3
              className={`${textStyle["text-primary"]} ${textStyle["text-base"]} ${textStyle["text-bold"]}`}
            >
              Validamos cada club para garantizar una experiencia segura
            </h3>
            <p
              className={`${textStyle["text-secondary"]} ${textStyle["text-sm"]} ${textStyle["text-regular"]}`}
            >
              Completá los datos iniciales para que podamos verificar tu
              identidad y activar tu espacio en la plataforma.
            </p>
          </section>
          <section className={pageStyle["registration-section"]}>
            <p
              className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-semibold"]}`}
            >
              Datos del representante legal
            </p>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Nombre y apellido completo{" "}
                <span className={textStyle["text-error"]}>*</span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: Carlos Miguel Olivera"
                name="fullName"
                required
                onChange={(e) =>
                  handleLegalRepChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                DNI <span className={textStyle["text-error"]}>*</span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 45454545"
                name="dni"
                required
                onChange={(e) =>
                  handleLegalRepChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                CUIL{" "}
                <span
                  className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
                >
                  {" "}
                  (para validar con la página de ANSES o AFIP)
                </span>
                <span className={textStyle["text-error"]}> *</span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 20456045605"
                name="cuil"
                required
                onChange={(e) =>
                  handleLegalRepChange(e.target.name, e.target.value)
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
                <span className={textStyle["text-error"]}> *</span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                value={user?.email || ""}
                disabled
                name="email"
                required
                onChange={(e) =>
                  handleLegalRepChange(e.target.name, e.target.value)
                }
              />
            </div>
          </section>
          <section className={pageStyle["registration-section"]}>
            <p
              className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-semibold"]}`}
            >
              Datos e identificación del club
            </p>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Nombre oficial del club
                <span
                  className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
                >
                  {" "}
                  (tal como figura en registros municipales o legales)
                </span>
                <span className={textStyle["text-error"]}> *</span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: Arena Fútbol"
                name="name"
                required
                onChange={(e) =>
                  handleClubInfoChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Dirección exacta del club{" "}
                <span className={textStyle["text-error"]}>*</span>
              </label>

              <div className={pageStyle["map-container"]}>
                <LocationPicker
                  onLocationSelect={(location) =>
                    setClubInforDraft((prev) => ({ ...prev, location }))
                  }
                />
              </div>
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                CUIT del club
                <span
                  className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
                >
                  {" "}
                  (verificable en AFIP con la razón social)
                </span>
                <span className={textStyle["text-error"]}> *</span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 20456045605"
                name="cuit"
                required
                onChange={(e) =>
                  handleClubInfoChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Razón social
                <span
                  className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
                >
                  {" "}
                  (si está inscripto como persona jurídica, asociación civil o
                  sociedad)
                </span>
                <span className={textStyle["text-error"]}> *</span>
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 20456045605"
                name="businessName"
                required
                onChange={(e) =>
                  handleClubInfoChange(e.target.name, e.target.value)
                }
              />
            </div>
          </section>
          <section className={pageStyle["registration-section"]}>
            <p
              className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-semibold"]}`}
            >
              Documentación legal
            </p>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Constancia de CUIT del club
                <span
                  className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
                >
                  {" "}
                  (emitida por AFIP)
                </span>
                <span className={textStyle["text-error"]}> *</span>
              </label>
              <FileUpload name={"cuitCert"} onChange={handleLegalDocsChange} />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Habilitación municipal
                <span
                  className={`${textStyle["text-secondary"]} ${textStyle["text-ligth"]}`}
                >
                  {" "}
                  (emitida por el municipio de La Rioja)
                </span>
                <span className={textStyle["text-error"]}> *</span>
              </label>
              <FileUpload
                name={"municipalAuth"}
                onChange={handleLegalDocsChange}
              />
            </div>
          </section>
          <ProgressivePrimaryBtn label="Enviar" loading={loading} disabled={!isFormComplete()} />
        </form>
      </div>
    </div>
  );
}
