import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // estilos predeterminados
import "./SelectDate.css"; // tus estilos personalizados

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="datepicker-button"
    onClick={onClick}
    ref={ref}
  >
    {value || "Hoy"}
  </button>
));

export default function SelectDate({ value, onChange }) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const [startDate, setStartDate] = useState(today);

  const handleChange = (date) => {
    setStartDate(date);
    if (onChange) onChange(date); // prop para elevar estado
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      minDate={today} // Para que el usuario no seleccione fechas anteriores a las de hoy
      maxDate={maxDate} // Para que el usuario solo seleccione fechas de hasta 7 días
      customInput={<CustomInput />}
    />
  );
}
