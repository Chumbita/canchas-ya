import pageStyle from "./Footer.module.css";
import textStyle from "../../styles/base/Text.module.css"
import facebookLogo from "../../assets/logos/facebook-logo.svg";
import instagramLogo from "../../assets/logos/instagram-logo.svg";
import xLogo from "../../assets/logos/x-logo.svg";

export default function Footer() {
  return (
    <footer className={pageStyle["footer"]}>
      <div className="">
        <section className={pageStyle["footer__section"]}>
          <h4 className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-bold"]}`}>Conectá con nosotros</h4>
          <p className={`${textStyle["text-secondary"]} ${textStyle["text-xs"]}`}>
            Escribinos, visitanos en redes o conocé cómo gestionar tu club con
            CanchasYa.
          </p>
          <div className={pageStyle["footer__section-contact"]}>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img src={facebookLogo} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <img src={instagramLogo} alt="Instagram" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <img src={xLogo} alt="Twitter" />
            </a>
          </div>
        </section>
        <section className={pageStyle["footer__section"]}>
          <h4 className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-bold"]}`}>Startup Info</h4>
          <a href="#" className={`${textStyle["text-secondary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}>¿Quiénes somos?</a>
          <a href="#" className={`${textStyle["text-secondary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}>Nuestro equipo</a>
        </section>
        <section className={pageStyle["footer__section"]}>
          <h4 className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} ${textStyle["text-bold"]}`}>Acciones rápidas</h4>
          <a href="#" className={`${textStyle["text-secondary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}>Reservá tu turno</a>
          <a href="#" className={`${textStyle["text-secondary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}>Gestioná tu club</a>
          <a href="#" className={`${textStyle["text-secondary"]} ${textStyle["text-xs"]} ${textStyle["text-medium"]}`}>Preguntas frecuentes</a>
        </section>
      </div>
    </footer>
    
  );
}
