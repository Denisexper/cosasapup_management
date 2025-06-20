export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
}; 