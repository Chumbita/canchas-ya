const API_URL = import.meta.env.VITE_API_URL;

export const registrationService = {
  playerRegister: async (playerData, token) => {
    const response = await fetch(`${API_URL}/auth/player/complete-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(playerData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al registrar el jugador");
    }
    return await response.json();
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
