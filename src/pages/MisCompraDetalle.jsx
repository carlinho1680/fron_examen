import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Text from "../components/atoms/Text";
import "./MisCompraDetalle.css";

const MisCompraDetalle = () => {
  const { id } = useParams();
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarDetalle = async () => {
    try {
      const resp = await api.get(`/compras/${id}`);
      setCompra(resp.data);
    } catch (error) {
      console.error("Error cargando detalle de compra:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  if (loading) {
    return <p className="loading">Cargando detalles...</p>;
  }

  if (!compra) {
    return <p className="error">No se encontró información de esta compra.</p>;
  }

  return (
    <div className="detalle-compra-container">

      <Text variant="h2" className="title">
        Detalle de la Compra #{compra.id}
      </Text>

      <div className="detalle-info">
        <p><strong>Fecha:</strong> {compra.fecha}</p>
        <p><strong>Estado:</strong> {compra.estado}</p>
        <p><strong>Total:</strong> ${compra.total}</p>

        {compra.direccion && (
          <p><strong>Dirección de envío:</strong> {compra.direccion}</p>
        )}
      </div>

      <Text variant="h3" className="subtitle">
        Productos Comprados
      </Text>

      <div className="lista-productos">
        {compra.productos?.map((item) => (
          <div key={item.id} className="producto-card">
            <img
              src={item.imagen}
              alt={item.nombre}
              className="producto-imagen"
            />

            <div className="producto-info">
              <p className="producto-nombre">{item.nombre}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio unidad: ${item.precio}</p>
              <p><strong>Subtotal: ${item.precio * item.cantidad}</strong></p>
            </div>
          </div>
        ))}
      </div>

      <a href="/mis-compras" className="btn-volver">
        Volver a Mis Compras
      </a>

    </div>
  );
};

export default MisCompraDetalle;
