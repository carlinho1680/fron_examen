import React, { useEffect, useState } from 'react';
import Text from '../components/atoms/Text';
import './MisCompras.css';

const MisCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch(`http://localhost:8080/compras/usuario/${userId}`);
        const data = await response.json();
        setCompras(data);
      } catch (error) {
        console.error("Error obteniendo las compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  return (
    <div className="mis-compras-container">

      <Text variant="h2" className="mis-compras-title">
        Mis Compras
      </Text>

      <Text variant="p" className="mis-compras-description">
        Aquí puedes revisar todas tus compras realizadas y el estado actual de cada una.
      </Text>

      {loading ? (
        <Text variant="p">Cargando compras...</Text>
      ) : compras.length === 0 ? (
        <Text variant="p">Aún no has realizado ninguna compra.</Text>
      ) : (
        <div className="compras-list">
          {compras.map((compra) => (
            <div key={compra.id} className="compra-card">
              
              <Text variant="h3" className="compra-card-title">
                Compra #{compra.id}
              </Text>

              <Text variant="p">
                <strong>Fecha:</strong> {new Date(compra.fecha).toLocaleString()}
              </Text>

              <Text variant="p">
                <strong>Estado:</strong> {compra.estado}
              </Text>

              <Text variant="p">
                <strong>Total:</strong> ${compra.total}
              </Text>

              <Text variant="h4" className="compra-productos-title">
                Productos:
              </Text>

              <ul className="productos-list">
                {compra.detalles.map((item) => (
                  <li key={item.id} className="producto-item">
                    {item.producto.nombre} — {item.cantidad} x ${item.precio}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisCompras;
