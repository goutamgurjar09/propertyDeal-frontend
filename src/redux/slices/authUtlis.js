const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const setAuthSession = (user) => {
  if (user?.accessToken) {
    localStorage.setItem(TOKEN_KEY, user.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserDetail = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };