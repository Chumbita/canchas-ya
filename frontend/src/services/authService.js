const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  requestOTP: async (email) => {
    const response = await fetch(`${API_URL}/auth/email/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al solicitar el OTP");
    }

    const data = await response.json();
    return { success: true, data: data }
  },

  verifyOTP: async (email, code, role) => {
    const response = await fetch(`${API_URL}/auth/email/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error al verificar el OTP");
    }

    const data = await response.json();
    return { success: true, data: data }
  },

  verifyToken: async (token) => {},
};
