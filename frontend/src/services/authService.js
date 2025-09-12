// simulación de una DB
const mockDataBase = {
  users: {},
  otpCodes: {},
};

// simulación del delay de la red
const delay = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

export const authService = {
  requestOTP: async (email) => {
    await delay();

    if (!email || !email.includes("@")) {
      throw new Error("Invalid email.");
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expirationTime = Date.now() + 5 * 60 * 1000;

    mockDataBase.otpCodes[email] = {
      code: otp,
      expiresAt: expirationTime,
      attemps: 0,
    };

    console.log(`OTP para ${email}: ${otp}`);

    return {
      success: true,
      message: "Código OTP evíado correctamente."
    };
  },

  verifyOTP: async (email, otp) => {
    await delay();

    const storedOTP = mockDataBase.otpCodes[email];
    console.log("stored:", storedOTP.code, "received:", otp);

    if (!storedOTP) throw new Error("Email y código OTP son requeridos");
    if (storedOTP.attemps >= 3) throw new Error("Demasiados intentos fallidos. Solicia un nuevo código");
    if (Date.now() > storedOTP.expiresAt) throw new Error("El código OTP ha expirado");

    if (storedOTP.code !== otp) {
      storedOTP.attemps++;
      throw new Error("Código OTP incorrecto");
    }

    delete mockDataBase.otpCodes[email];
    
    let isNew = false;
    if (!mockDataBase.users[email]) {
      mockDataBase.users[email] = { email, createdAt: Date.now(), completed: false}
      isNew = true;
    }

    const token = btoa(JSON.stringify({ email, exp: Date.now() + 24 * 60 * 60 * 1000 }));

    return { success: true, token, user: mockDataBase.users[email], isNew };
  },

  verifyToken: async (token) => {
    await simulateNetworkDelay();
    
    try {
      const decoded = JSON.parse(atob(token));

      if (Date.now() > decoded.exp) {
        throw new Error("Token expirado");
      }

      return {
        valid: true,
        user: mockDataBase.users[decoded.email] || { email: decoded.email },
      };
    } catch (error) {
      throw new Error("Token inválido");
    }
  },
};
