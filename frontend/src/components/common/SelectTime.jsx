import React, { useState } from "react";
import Select from "react-select";
import "./Select.css";

const timeOptions = [
  { value: "15", label: "15:00" },
  { value: "16", label: "16:00" },
  { value: "17", label: "17:00" },
  { value: "18", label: "18:00" },
  { value: "19", label: "19:00" },
  { value: "20", label: "20:00" },
  { value: "21", label: "21:00" },
  { value: "22", label: "22:00" },
  { value: "23", label: "23:00" },
  { value: "24", label: "00:00" },
  { value: "01", label: "01:00" },
  { value: "02", label: "02:00" },
  { value: "03", label: "03:00" },
  { value: "04", label: "04:00" },
];

export default function SelectTime({ onChange, value }) {
  const [selected, setSelected] = useState(value || null);

  const handleChange = (option) => {
    setSelected(option);
    if (onChange) onChange(option); // prop para elevar estado
  };

  return (
    <div className="select-wrapper">
      <Select
        className="rs-container" // container propio
        classNamePrefix="rs" // prefijo para clases internas
        options={timeOptions}
        value={selected}
        onChange={handleChange}
        placeholder="¿A qué hora"
        isSearchable={false} // buscar o no (toggle)
        aria-label="Seleccionar una hora"
        menuPlacement="auto"
      />
    </div>
  );
}
