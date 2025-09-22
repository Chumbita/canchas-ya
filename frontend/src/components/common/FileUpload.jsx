import React, { useCallback, useState } from "react";
import componentStyle from "./FileUpload.module.css"
import textStyle from "../../styles/base/Text.module.css"
import uploadIcon from "../../assets/icons/upload-file-icon.svg"

const MAX_SIZE_MB = 5;

export default function FileUpload({ name, onChange}) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    const selectedFile = e.target.files[0];

    if (!selectedFile) return
    if (selectedFile.type !== "application/pdf") {
      setError("Solo se permiten archivos PDF.");
      return;
    }
    if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024){
      setError("El archivo excede el tamaño máximo de 5MB.");
      return;
    }

    setFile(selectedFile);
    onChange(e.target.name, selectedFile);
  } 
  return (
    <div className={componentStyle["upload"]}>
      <img className={componentStyle["upload__icon"]} src={uploadIcon} alt="upload" />
      <div className={componentStyle["upload-text"]}>
        <p className={`${textStyle["text-primary"]} ${textStyle["text-sm"]} `}>Selecciona un archivo</p>
        <p className={`${textStyle["text-secondary"]} ${textStyle["text-sm"]} ${textStyle["text-regular"]} `}>Archivo PDF no más de 5MB</p>
      </div>
      <div>
        <label className={componentStyle["upload__button"]}>
          <input type="file" onChange={handleFileChange} name={name} hidden />
          Elegir archivo
        </label>
      </div>

      {error && <p className={`${textStyle["text-error"]} ${textStyle["text-sm"]}`}>{error}</p>}

      {file && <p className={`${textStyle["text-primary"]} ${textStyle["text-xs"]} `}><strong>Archivo:</strong> {file.name} ({(file.size / 1024 / 1024).toFixed("")}MB)</p>}
    </div>
  )
}
