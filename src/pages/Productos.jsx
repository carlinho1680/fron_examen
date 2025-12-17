import { useEffect, useState } from "react";
import { getProductos } from "../api/productos.service";
import { usarCarrito } from "../context/CarritoContext";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = usarCarrito();

useEffect(() => {
  getProductos()
    .then(res => {
      console.log("RESPUESTA BACKEND:", res);
      console.log("DATA:", res.data);
      setProductos(res.data);
    })
    .catch(err => {
      console.error("ERROR AXIOS:", err);
    });
}, []);

  return (
    <div className="productos-page">
      <h1>Productos</h1>

      <div className="productos-grid">
        {productos.map(p => (
          <div key={p.id} className="producto-card">
            <img
              src={p.imagen || "https://via.placeholder.com/200"}
              alt={p.nombre}
            />

            <h3>{p.nombre}</h3>
            <p>${p.precio.toLocaleString("es-CL")}</p>

            <button
              onClick={() =>
                agregarAlCarrito({
                  id: p.id,
                  name: p.nombre,
                  price: p.precio,
                  image: p.imagen
                })
              }
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
