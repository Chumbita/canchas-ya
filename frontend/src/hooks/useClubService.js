import { useState } from "react";
import { clubService } from "../services/clubService";

export const useClubService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const response = await clubService.register(payload);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    registerClubApi,
  };
};
