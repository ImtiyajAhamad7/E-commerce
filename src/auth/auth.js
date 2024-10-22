export const isLoggedIn = () => {
  const token = sessionStorage.getItem("accessToken");
  return token !== null; // If token exists, return true
};
