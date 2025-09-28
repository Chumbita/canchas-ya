import { useState } from "react";
import { registrationService } from "../services/registrationService";

export const useUserRegistration = () => {
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

      const response = await registrationService.playerRegister(payload);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerClubApi = async (clubData) => {
    setLoading(true);
    setError(null);

    const payload = new FormData();
    payload.append(
      "data",
      JSON.stringify({
        legalRep: clubData.legalRep,
        clubInfo: clubData.clubInfo,
      })
    );
    payload.append("legalDocs[cuitCert]", clubData.legalDocs.cuitCert);
    payload.append(
      "legalDocs[municipalAuth]",
      clubData.legalDocs.municipalAuth
    );

    try {
      const response = await registrationService.clubRegister(payload);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerPlayerApi,
    registerClubApi,
    loading,
    error,
  };
};
