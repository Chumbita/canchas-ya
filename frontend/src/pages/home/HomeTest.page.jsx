import SearchReservation from "../../components/common/SearchReservation";
import pageStyle from "./HomeTest.module.css";
import textStyles from "../../styles/base/Text.module.css";
import clockIcon from "../../assets/icons/clock-icon.png"
import cardIcon from "../../assets/icons/card-icon.png"
import checkIcon from "../../assets/icons/check-icon.png"

export default function HomeTest() {
  return (
    <div className={pageStyle["home-container"]}>
      <section className={pageStyle["hero-section"]}>
        <div className={pageStyle["hero-layout"]}>
          <div className={pageStyle["hero-banner"]}>
            <h1 className={pageStyle["hero-title"]}>
              Reservá tu cancha en segundos
            </h1>
            <p
              className={`${textStyles["text-secondary"]} ${textStyles["text-lg"]} ${textStyles["text-semibold"]}`}
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
        <h2 className={pageStyle["feature-section__title"]}>La forma más simple de jugar</h2>
        <p className={pageStyle["feature-section__description"]}>
          Canchas Ya te conecta con las mejores instalaciones deportivas de tu
          ciudad, haciendo que reservar sea tan fácil como debería ser.
        </p>
        <div className={pageStyle["features-container"]}>
          <div className={pageStyle["features-card"]}>
            <div className={pageStyle["card-icon"]}>
              <img
                src={clockIcon}
                width="30"
                height="30"
              />
            </div>
            <h3 className={`${textStyles["text-primary"]} ${textStyles["text-bold"]} ${textStyles["text-2xl"]} `}>
              Reservá en segundos
            </h3>
            <p
              className={`${textStyles["text-secondary"]} ${textStyles["text-lg"]}`}
            >
              Encontrá tu cancha ideal sin complicaciones
            </p>
          </div>
          <div className={pageStyle["features-card"]}>
            <div className={pageStyle["card-icon"]}>
              <img
                src={cardIcon}
                width="30"
                height="30"
              />
            </div>
            <h3 className={`${textStyles["text-primary"]} ${textStyles["text-bold"]} ${textStyles["text-2xl"]} `}>
              Pagá como quieras
            </h3>
            <p
              className={`${textStyles["text-secondary"]} ${textStyles["text-lg"]}`}
            >
              Pagá online con cualquier tarjeta
            </p>
          </div>
          <div className={pageStyle["features-card"]}>
            <div className={pageStyle["card-icon"]}>
              <img
                src={checkIcon}
                width="30"
                height="30"
              />
            </div>
            <h3 className={`${textStyles["text-primary"]} ${textStyles["text-bold"]} ${textStyles["text-2xl"]} `}>
              Turnos 24/7
            </h3>
            <p
              className={`${textStyles["text-secondary"]} ${textStyles["text-lg"]}`}
            >
              Sacá turno en cualquier momento, estés donde estés
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
