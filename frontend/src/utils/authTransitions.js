export const startAuthTransition = () => {
  sessionStorage.setItem("authTransition", "true");
  setTimeout(() => {
    sessionStorage.removeItem("authTransition");
  }, 1000);
};

export const clearAuthTransition = () => {
  sessionStorage.removeItem("authTransition");
};

export const isAuthTransitioning = () => {
  return sessionStorage.getItem("authTransition") === "true";
};
