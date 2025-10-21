import { useState } from "react";
import { playerService } from "../services/playerService";

export const usePlayerService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerPlayerApi = async (playerData) => {
    setLoading(true);
    setError(null);

    try {
      const { email, firstName, lastName } = playerData.player;

      const payload = {
        email,
        firstName,
        lastName,
      };

      const response = await playerService.register(payload);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogleApi = async (idToken) => {
    if (!idToken || typeof idToken !== "string") {
      setError("ID token inválido");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await playerService.loginWithGoogle(idToken);
      return response;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    registerPlayerApi,
    loginWithGoogleApi,
  };
};
