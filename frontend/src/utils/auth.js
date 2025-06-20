export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
}; 