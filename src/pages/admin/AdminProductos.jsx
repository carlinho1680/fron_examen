import React, { useEffect, useState } from "react";
import { getAdminProductos, eliminarProductoAPI } from "../../api/admin.service";
import { useNavigate } from "react-router-dom";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const cargarDesdeBD = async () => {
    try {
      setCargando(true);
      const res = await getAdminProductos();
      setProductos(res.data);
    } catch (error) {
      console.error("Error al conectar con la base de datos:", error);
      alert("No se pudieron cargar los productos de la base de datos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDesdeBD();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto de la base de datos?")) {
      try {
        await eliminarProductoAPI(id);
        setProductos(productos.filter(p => (p.idProducto || p.id) !== id));
      } catch (error) {
        alert("Error al intentar eliminar el producto");
      }
    }
  };

  if (cargando) return <div style={{marginTop: "150px", textAlign: "center"}}>Conectando con la base de datos...</div>;

  return (
    <div style={{ marginTop: "120px", padding: "20px", maxWidth: "1000px", margin: "120px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#1a3a8a" }}>Gestión de Inventario (BD)</h2>
        <button 
          onClick={() => navigate("/admin/productos/AdminCrearProducto")}
          style={{ backgroundColor: "#28a745", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          + Agregar Producto
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#1a3a8a", color: "white" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Nombre del Producto</th>
            <th style={{ padding: "12px", textAlign: "left" }}>Precio</th>
            <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No hay productos en la base de datos.</td></tr>
          ) : (
            productos.map((p) => (
              <tr key={p.idProducto || p.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>#{p.idProducto || p.id}</td>
                <td style={{ padding: "12px", fontWeight: "bold" }}>{p.nombre}</td>
                <td style={{ padding: "12px" }}>${p.precio?.toLocaleString("es-CL")}</td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button 
                    onClick={() => navigate(`/admin/productos/editar/${p.idProducto || p.id}`)}
                    style={{ marginRight: "10px", padding: "5px 10px", cursor: "pointer" }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleEliminar(p.idProducto || p.id)}
                    style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}