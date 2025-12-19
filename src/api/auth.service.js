import api from "./axios";

export const loginService = (data) => {
  return api.post("/auth/login", data);
};

export const registerService = (data) => {
  return api.post("/usuarios", data); 
};