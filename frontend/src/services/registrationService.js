const API_URL = import.meta.env.VITE_API_URL;

export const registrationService = {
  playerRegister: async (playerData) => {
    try {
    } catch (error) {}
  },

  clubRegister: async (clubData) => {
    const response = await fetch(`${API_URL}/auth/club/register`, {
      method: "POST",
      body: clubData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al registrar el club");
    }

    return await response.json();
  },
};
