import { use, useState } from "react";
import { loginClub } from "../services/authClub";
import { useAuth } from "../context/AuthContext";

export const useClubLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { status, token, club } = await loginClub(email, "123456");
      if (status === "success") {
        login(club, token, "club");
        setLoading(false);
        console.log("Login successful");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log("Login failed");
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};
