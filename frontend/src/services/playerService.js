const API_URL = import.meta.env.VITE_API_URL;

export const playerService = {
  register: async (playerData, token) => {
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

  loginWithGoogle: async (accessToken) => {
    const response = await fetch(`${API_URL}/auth/player/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res.error);
      throw new Error("Error al iniciar sesión con Google");
    }
    return await response.json();
  },
};
