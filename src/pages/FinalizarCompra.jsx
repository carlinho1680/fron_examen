import { usarCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export default function FinalizarCompra() {
  const { carrito, vaciarCarrito } = usarCarrito();
  const navigate = useNavigate();

  const total = carrito.reduce(
    (acc, p) => acc + p.price * p.cantidad,
    0
  );

  const confirmarCompra = () => {
    alert("Compra realizada con éxito ");
    vaciarCarrito();
    navigate("/");
  };

  return (
    <div>
      <h1>Finalizar Compra</h1>

      {carrito.map(p => (
        <div key={p.id}>
          <p>{p.name} x {p.cantidad}</p>
          <p>${(p.price * p.cantidad).toLocaleString("es-CL")}</p>
        </div>
      ))}

      <h2>Total: ${total.toLocaleString("es-CL")}</h2>

      <button onClick={confirmarCompra}>
        Confirmar Compra
      </button>
    </div>
  );
}
