import React from "react";
import { useNavigate } from "react-router-dom";
import { usarCarrito } from "../context/CarritoContext";

export default function Carrito() {
  const navigate = useNavigate();

  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    eliminarProductoCompleto,
    vaciarCarrito
  } = usarCarrito();

  const total = carrito.reduce(
    (acc, p) => acc + p.price * p.cantidad,
    0
  );

  return (
    <div className="carrito-page">
      <h1>Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="carrito-items">
            {carrito.map((p) => (
              <div key={p.id} className="carrito-item">
                <img src={p.image} alt={p.name} />

                <div className="carrito-info">
                  <h3>{p.name}</h3>
                  <p>
                    Precio unitario: $
                    {p.price.toLocaleString("es-CL")}
                  </p>

                  {/* CONTROLES DE CANTIDAD */}
                  <div className="cantidad-controles">
                    <button
                      className="btn-cant"
                      onClick={() => eliminarDelCarrito(p.id)}
                    >
                      -
                    </button>

                    <span className="cantidad-num">{p.cantidad}</span>

                    <button
                      className="btn-cant"
                      onClick={() => agregarAlCarrito(p)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProductoCompleto(p.id)}
                  >
                    Eliminar producto
                  </button>
                </div>

                <div className="carrito-subtotal">
                  Subtotal: $
                  {(p.price * p.cantidad).toLocaleString("es-CL")}
                </div>
              </div>
            ))}
          </div>

          <h2 className="carrito-total">
            Total: ${total.toLocaleString("es-CL")}
          </h2>

          <button
            className="btn-vaciar"
            onClick={() => navigate("/finalizarcompra")}
          >
            Finalizar Compra
          </button>

          <button className="btn-vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}
