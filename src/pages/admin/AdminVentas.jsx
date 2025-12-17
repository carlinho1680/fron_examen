import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Text from "../../components/atoms/Text";
import { Link } from "react-router-dom";

export default function AdminVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const resp = await api.get("/ventas");
      setVentas(resp.data);
    };
    cargar();
  }, []);

  return (
    <div className="admin-ventas">
      <Text variant="h2">Ventas</Text>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Usuario</th><th>Total</th><th>Fecha</th><th>Estado</th><th></th></tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.usuarioId || v.usuario?.email}</td>
              <td>{v.total}</td>
              <td>{new Date(v.fecha).toLocaleString()}</td>
              <td>{v.estado}</td>
              <td><Link to={`/admin/ventas/${v.id}`}>Ver</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
