import React, { useState } from "react";
import Select from "react-select";
import "./Select.css";

const sportOptions = [
  { value: "futbol4", label: "Fútbol 4" },
  { value: "futbol5", label: "Fútbol 5" },
  { value: "futbol6", label: "Fútbol 6" },
  { value: "futbol8", label: "Fútbol 8" },
  { value: "futbol11", label: "Fútbol 11" },
  { value: "padel", label: "Pádel" },
  { value: "tenis", label: "Tenis" },
  { value: "basket", label: "Básquet 3x3" },
  { value: "basket", label: "Básquet 5x5" },
];

export default function SelectSport({ onChange, value }) {
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
        options={sportOptions}
        value={selected}
        onChange={handleChange}
        placeholder="¿Qué querés jugar?"
        isSearchable={false} // buscar o no (toggle)
        aria-label="Seleccionar deporte"
        menuPlacement="auto"
      />
    </div>
  );
}
