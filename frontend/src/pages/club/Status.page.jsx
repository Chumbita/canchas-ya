import pageStyle from "./Status.module.css";
import btnStyle from "../../styles/base/Button.module.css";
import textStyle from "../../styles/base/Text.module.css";
import underReviewIcon from "../../assets/icons/under-review-icon.svg"
import rejectedIcon from "../../assets/icons/rejected-icon.svg"

export default function Status({ status }) {
  status = "rejected"
  const requestUnderReview = {
    icon: underReviewIcon,
    title: "Tu solicitud está en proceso",
    description: "Nuestro equipo está revisando la información de tu club. Te avisaremos por correo apenas tengamos novedades"
  }

  const requestRejected = {
    icon: rejectedIcon,
    title: "Tu solicitud no fue aprobada",
    description: "Luego de revisar la información de tu club, nuestro equipo determinó que no cumple con los requisitos necesarios para completar el registro. Si querés volver a intentarlo, podés actualizar los datos y enviar una nueva solicitud.",
  }

  return (
    <div className={pageStyle["content"]}>
      <div className={pageStyle["club-status-layout"]}>
        <img
          src={ status === "pending" ? requestUnderReview.icon : requestRejected.icon}
          alt="ok icon"
          className={pageStyle["club-status__icon"]}
        />
        <h3
          className={`${textStyle["text-primary"]} ${textStyle["text-2xl"]} ${textStyle["text-extra-bold"]}`}
        >
          {status === "pending" ? requestUnderReview.title : requestRejected.title}
        </h3>
        <p
          className={`${textStyle["text-secondary"]} ${textStyle["text-sm"]} ${textStyle["text-ligth"]}`}
        >
          {status === "pending" ? requestUnderReview.description : requestRejected.description}
        </p>
      </div>
    </div>
  );
}
