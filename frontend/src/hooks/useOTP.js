import { useState, useRef } from "react";

export const useOTP = (length = 4) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (value !== "" && !/^\d$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Mover focus al siguiente input
    if (value !== "" && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (index > 0) inputsRef.current[index - 1]?.focus();
        break;
      case "ArrowRight":
        if (index < otp.length - 1) inputsRef.current[index + 1]?.focus();
        break;
      case "Backspace":
        if (otp[index] === "" && index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
        break;
      default:
        break;
    }
  };

  const otpCode = otp.join("");

  const isValid = /^\d+$/.test(otpCode) && otpCode.length === length;

  return { otp, setOtp, otpCode, isValid, handleChange, handleKeyDown, inputsRef };
};
