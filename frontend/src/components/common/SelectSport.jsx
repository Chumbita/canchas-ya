import React, { useState } from "react";
import Select from "react-select";
import "./Select.css";

const sportOptions = [
  { value: "Fútbol", label: "Fútbol" },
  { value: "Básquet", label: "Básquet" },
  { value: "Tenis", label: "Tenis" },
  { value: "Paddle", label: "Paddle" },
  { value: "Voleibol", label: "Voleibol" },
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
