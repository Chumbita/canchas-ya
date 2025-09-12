import { useState } from "react";
import FileUpload from "../../components/common/FileUpload";
import pageStyle from "./ClubRegister.module.css";
import textStyle from "../../styles/base/Text.module.css";
import inputStyle from "../../styles/base/Inputs.module.css";
import btnStyle from "../../styles/base/Button.module.css";

export default function ClubRegister() {
  const email = sessionStorage.getItem("otpEmail");
  const [legalRepDraft, setLegalRepDraft] = useState({
    fullName: "",
    dni: "",
    cuil: "",
    email: email || "",
  });
  const [clubInfoDraft, setClubInforDraft] = useState({
    name: "",
    location: "",
    cuit: "",
    bussinessName: "",
  });
  const [legalDocsDraft, setLegalDocsDraft] = useState({
    cuitCert: null,
    municipalAuth: null,
  });

  const handleLegalRepChange = (field, value) => {
    setLegalRepDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleClubInfoChange = (field, value) => {
    setClubInforDraft((prev) => ({ ...prev, [field]: value }));
  };
  const handleLegalDocsChange = (field, value) => {
    setLegalDocsDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationDraft = {
      legalRep: legalRepDraft,
      clubInfo: clubInfoDraft,
      legalDocsDraft: legalDocsDraft,
    };

    console.log(registrationDraft);
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
                Nombre y apellido completo
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: Carlos Miguel Olivera"
                name="fullName"
                onChange={(e) =>
                  handleLegalRepChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                DNI
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 45454545"
                name="dni"
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
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 20456045605"
                name="cuil"
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
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                value={email ? email : ""}
                disabled
                name="email"
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
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: Arena Fútbol"
                name="name"
                onChange={(e) =>
                  handleClubInfoChange(e.target.name, e.target.value)
                }
              />
            </div>
            <div className={pageStyle["registration-section__field"]}>
              <label
                className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}
              >
                Dirección exacta
              </label>
              <input
                name="location"
                className={inputStyle["input"]}
                type="text"
                onChange={(e) =>
                  handleClubInfoChange(e.target.name, e.target.value)
                }
              />
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
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 20456045605"
                name="cuit"
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
              </label>
              <input
                type="text"
                className={inputStyle["input"]}
                placeholder="Ej: 20456045605"
                name="bussinessName"
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
              </label>
              <FileUpload
                name={"municipalAuth"}
                onChange={handleLegalDocsChange}
              />
            </div>
          </section>
          <button className={`${btnStyle["btn"]} ${btnStyle["btn-primary"]}`}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
