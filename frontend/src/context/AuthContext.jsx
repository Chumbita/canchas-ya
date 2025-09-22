import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    role: null, // "club" | "player"
    clubStatus: null, // "active" | "pending" | "rejected"
    step: "idle" //| "otp" | "registered"
  });

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  const login = (user, token, role) => {
    const newAuth = { ...auth, user, token, role, step: "otp" };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const verifyOtp = (isRegistered, clubStatus = null) => {
    let nextStep;
    let newStatus = null;

    if (auth.role === "club") {
      if (isRegistered) {
        newStatus = clubStatus;
        nextStep = "registered";
      } else {
        nextStep = "register";
      }
    }

    if (auth.role === "player") {
      if (isRegistered) {
        newStatus = null;
        nextStep = "registered";
      } else {
        newStatus = null;
        nextStep = "register";
      }
    }

    const newAuth = { ...auth, status: newStatus, step: nextStep };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
    console.log(newAuth)
  };

  const registerClub = () => {
    const newAuth = { ...auth, step: "registered", status: "pending" };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    setAuth({
      user: null,
      token: null,
      role: null,
      status: null,
      step: "idle",
    });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, verifyOtp, registerClub, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
