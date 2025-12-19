import React, { useEffect, useState, useContext } from "react";
import { obtenerComprasUsuario } from "../api/venta.service";
import { AuthContext } from "../context/AuthContext";

export default function MisCompras() {
  const { user } = useContext(AuthContext);
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user || !user.id) {
          console.warn("No hay ID de usuario disponible");
          return;
      }
      try {
        const response = await obtenerComprasUsuario(user.id);
        console.log("Respuesta de la API:", response.data);
        setCompras(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error al cargar compras:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [user]);

  if (cargando) return <div style={{ marginTop: "150px", textAlign: "center" }}>Buscando tus pedidos...</div>;

  return (
    <div className="container" style={{ marginTop: "120px", padding: "20px" }}>
      <h2 style={{ color: "#1a3a8a", textAlign: "center", marginBottom: "30px" }}>Historial de Pedidos</h2>

      {compras.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No se encontraron compras para este usuario (ID: {user?.id}).
        </p>
      ) : (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {compras.map((compra) => (
            <div 
              key={compra.idVenta || compra.id} 
              style={{ 
                background: "white", 
                border: "1px solid #dee2e6", 
                padding: "20px", 
                marginBottom: "15px", 
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ color: "#1a3a8a" }}>Orden #{compra.idVenta || compra.id}</strong>
                <span style={{ color: "#666" }}>
                  {compra.fechaVenta ? new Date(compra.fechaVenta).toLocaleDateString() : 'Sin fecha'}
                </span>
              </div>
              
              <div style={{ marginTop: "10px" }}>
                <p style={{ margin: 0 }}><strong>Documento:</strong> {compra.tipoDocumento || "N/A"}</p>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#28a745", marginTop: "10px" }}>
                  Total: ${compra.total ? compra.total.toLocaleString("es-CL") : "0"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}