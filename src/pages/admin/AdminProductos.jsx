import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../api/axios";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const resp = await fetch(`${API_URL}/productos`);
    const data = await resp.json();
    setProductos(data);
  };

  const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

    await fetch(`${API_URL}/productos/${id}`, {
      method: "DELETE",
    });

    cargarProductos();
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="container">
      <h1>Administrar Productos</h1>

      <Link to="/admin/productos/crear" className="btn btn-primary">
        Crear Producto
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.idProducto}>
              <td>{p.idProducto}</td>
              <td>{p.nombre}</td>
              <td>{p.marca}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <Link
                  to={`/admin/productos/editar/${p.idProducto}`}
                  className="btn btn-warning btn-sm"
                >
                  Editar
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(p.idProducto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
