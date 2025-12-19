import { usarCarrito } from "../context/CarritoContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function FinalizarCompra() {
  const { carrito, vaciarCarrito } = usarCarrito();
  const navigate = useNavigate();

  const confirmarCompra = async () => {
    try {
      await api.post("/ventas", {
        productos: carrito
      });

      alert("Compra realizada con éxito");
      vaciarCarrito();
      navigate("/");
    } catch (err) {
      alert("Error al procesar la compra");
    }
  };

  return (
    <div>
      <h2>Confirmar Compra</h2>
      <button onClick={confirmarCompra}>Confirmar</button>
    </div>
  );
}
