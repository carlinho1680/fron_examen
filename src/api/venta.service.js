import api from "./axios";

export const finalizarCompraAPI = async (itemsCarrito, usuarioId) => {
  const payload = {
    idUsuario: usuarioId,
    tipoDocumento: "BOLETA", 
    detalles: itemsCarrito.map(p => ({
      idInventario: p.idInventario || p.id, 
      cantidad: p.cantidad
    }))
  };

  console.log("JSON final validado con DTOs Java:", payload);
  return await api.post("/ventas", payload);
};

export const obtenerComprasUsuario = async (idUsuario) => {
  return await api.get(`/ventas/usuario/${idUsuario}`);
};