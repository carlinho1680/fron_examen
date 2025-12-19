import api from "./axios";

export const getProductos = () => api.get("/productos");
