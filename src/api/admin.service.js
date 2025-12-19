import api from "./axios";

export const getAdminProductos = async () => {
  return await api.get("/productos");
};

export const eliminarProductoAPI = async (id) => {
  return await api.delete(`/productos/${id}`);
};