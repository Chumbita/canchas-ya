import pageStyle from "./RegistrationSuccess.module.css"
import btnStyle from "../../styles/base/Button.module.css"
import textStyle from "../../styles/base/Text.module.css"
import okIcon from "../../assets/icons/ok-icon.svg"

export default function RegistrationSuccess() {
  return (
    <div className={pageStyle["content"]}>
      <div className={pageStyle["club-registration-success-layout"]}>
          <div className={pageStyle["club-registration-success__circle"]}>
            <img src={okIcon} alt="ok icon" className={pageStyle["club-registration-success__icon"]} />
          </div>
        <h3 className={`${textStyle["text-primary"]} ${textStyle["text-2xl"]} ${textStyle["text-extra-bold"]}`}>Tu solicitud fue enviada con éxito</h3>
        <p className={`${textStyle["text-secondary"]} ${textStyle["text-sm"]} ${textStyle["text-ligth"]}`}>El equipo de CanchasYa! revisará la información para validar que todo esté en orden. Te notificaremos por mail cuando tu solicitud haya sido aprobada o si necesitamos más detalles</p>
        <button className={`${btnStyle["btn"]} ${btnStyle["btn-primary"]}`}>Estado de solicitud</button>
      </div>
    </div>
  )
}
