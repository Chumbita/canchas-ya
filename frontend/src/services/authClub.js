export const loginClub = async (email, password) => {
  await new Promise((res) => setTimeout(res, 1000));
  if (email === "club@email.com" && password === "123456") {
    return {
      status: "success",
      token: "fake-jwt-token",
      club: {
        id: 1,
        name: "Club Example",
        email: "club@email.com",
      },
    };
  }
  throw new Error("Invalid credentials");
};
