import pageStyle from "./HeaderSecondary.module.css";
import textStyle from "../../styles/base/Text.module.css";
import btnStyle from "../../styles/base/Button.module.css";

export default function HeaderSecondary() {
  return (
    <div className={pageStyle.header}>
      <div className={pageStyle.content}>
        <h1
          className={`${textStyle["text-primary"]} ${textStyle["text-lg"]} ${textStyle["text-extra-bold"]}`}
        >
          Canchas Ya
        </h1>
      </div>
    </div>
  );
}
