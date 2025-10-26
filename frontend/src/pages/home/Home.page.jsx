import SearchReservation from "../../components/common/SearchReservation";
import pageStyle from "./Home.module.css";
import textStyles from "../../styles/base/Text.module.css";
import clockIcon from "../../assets/icons/clock-icon.svg";
import cardIcon from "../../assets/icons/credit-card-icon.svg";
import checkIcon from "../../assets/icons/check-icon.svg";

export default function Home() {
  return (
    <div className={pageStyle["home-container"]}>
      <section className={pageStyle["hero-section"]}>
        <div className={pageStyle["hero-layout"]}>
          <div className={pageStyle["hero-banner"]}>
            <h1 className={pageStyle["hero-title"]}>
              Reservá tu cancha en segundos
            </h1>
            <p
              className={`${textStyles["text-secondary"]} ${textStyles["text-lg"]} ${textStyles["text-medium"]}`}
            >
              La forma más simple y rápida de encontrar y reservar canchas
              deportivas en La Rioja. Sin complicaciones, sin esperas.
            </p>
          </div>
          <div className={pageStyle["hero-search"]}>
            <SearchReservation />
            <p
              className={`${textStyles["text-primary"]} ${textStyles["text-sm"]} ${textStyles["text-medium"]}`}
            >
              Encontrá y reservá canchas disponibles en tu zona
            </p>
          </div>
        </div>
      </section>
      <section className={pageStyle["features-section"]}>
        <div className={pageStyle["feature-layout"]}>
          <div className={pageStyle["features-container"]}>
            <div className={pageStyle["features-card"]}>
              <div className={pageStyle["card-icon"]}>
                <img src={clockIcon} width="30" height="30" />
              </div>
              <h3
                className={`${textStyles["text-primary"]} ${textStyles["text-bold"]} ${textStyles["text-xl"]} `}
              >
                Reservá en segundos
              </h3>
              <p
                className={`${textStyles["text-secondary"]} ${textStyles["text-base"]}`}
              >
                Encontrá tu cancha ideal sin complicaciones
              </p>
            </div>
            <div className={pageStyle["features-card"]}>
              <div className={pageStyle["card-icon"]}>
                <img src={cardIcon} width="30" height="30" />
              </div>
              <h3
                className={`${textStyles["text-primary"]} ${textStyles["text-bold"]} ${textStyles["text-xl"]} `}
              >
                Pagá como quieras
              </h3>
              <p
                className={`${textStyles["text-secondary"]} ${textStyles["text-base"]}`}
              >
                Pagá online con cualquier tarjeta
              </p>
            </div>
            <div className={pageStyle["features-card"]}>
              <div className={pageStyle["card-icon"]}>
                <img src={checkIcon} width="30" height="30" />
              </div>
              <h3
                className={`${textStyles["text-primary"]} ${textStyles["text-bold"]} ${textStyles["text-xl"]} `}
              >
                Turnos 24/7
              </h3>
              <p
                className={`${textStyles["text-secondary"]} ${textStyles["text-base"]}`}
              >
                Sacá turno en cualquier momento, estés donde estés
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
