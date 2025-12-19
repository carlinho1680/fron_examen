import React from "react";
import { useNavigate } from "react-router-dom";
import { usarCarrito } from "../context/CarritoContext";
import { finalizarCompraAPI } from "../api/venta.service";

export default function Carrito() {
  const navigate = useNavigate();
  const { carrito, agregarAlCarrito, eliminarDelCarrito, eliminarProductoCompleto, vaciarCarrito } = usarCarrito();

  const total = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);

  const handleFinalizarCompra = async () => {
    const rawUser = localStorage.getItem("usuario");
    
    if (!rawUser || rawUser === "undefined") {
      alert("No se detecta sesión activa. Inicia sesión nuevamente.");
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(rawUser);

    if (!usuario.id) {
      alert("Error: ID de usuario no encontrado. Reintenta el login.");
      return;
    }

    try {
      // Llamamos a la API con los datos del carrito y el ID del usuario
      await finalizarCompraAPI(carrito, usuario.id);
      alert("¡Compra guardada con éxito!");
      vaciarCarrito();
      navigate("/finalizarcompra");
    } catch (error) {
      console.error("Error en el servidor:", error);
      // Imprimimos la respuesta del error 400 para saber qué falló en Java
      if (error.response) {
        console.log("Detalle del error 400:", error.response.data);
      }
      alert("Hubo un error 400: Los datos no coinciden con lo que espera el servidor.");
    }
  };

  return (
    <div className="carrito-page" style={{ marginTop: "120px", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#193591" }}>Tu Carrito de Compras</h1>
      
      {carrito.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Tu carrito está vacío.</p>
          <button onClick={() => navigate("/productos")} style={{ padding: "10px 20px", cursor: "pointer" }}>Ver Productos</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flex: "1", maxWidth: "600px" }}>
            {carrito.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", background: "#fff", padding: "15px", marginBottom: "10px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <img src={p.image} alt={p.name} style={{ width: "80px", borderRadius: "5px" }} />
                <div style={{ flex: "1", marginLeft: "20px" }}>
                  <h3 style={{ margin: "0" }}>{p.name}</h3>
                  <p style={{ fontWeight: "bold" }}>${p.price.toLocaleString("es-CL")}</p>
                  <div>
                    <button onClick={() => eliminarDelCarrito(p.id)}>-</button>
                    <span style={{ margin: "0 10px" }}>{p.cantidad}</span>
                    <button onClick={() => agregarAlCarrito(p)}>+</button>
                  </div>
                </div>
                <button onClick={() => eliminarProductoCompleto(p.id)} style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>Eliminar</button>
              </div>
            ))}
          </div>
          
          <div style={{ width: "300px", background: "#f8f9fa", padding: "20px", borderRadius: "10px", height: "fit-content" }}>
            <h3>Resumen</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Total: ${total.toLocaleString("es-CL")}</p>
            <button onClick={handleFinalizarCompra} style={{ width: "100%", padding: "15px", backgroundColor: "#193591", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}