import { Link } from "react-router-dom";
import { usarCarrito } from "../../context/CarritoContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = usarCarrito();
  const [animando, setAnimando] = useState(false);

  const handleAdd = () => {
    agregarAlCarrito(product);

    setAnimando(true);
    setTimeout(() => setAnimando(false), 800);
  };

  return (
    <div className={`product-card ${animando ? "animacion-add" : ""}`}>
      
      <Link to={`/producto/${product.id}`} className="product-link">
        <img className="product-img" src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p className="price">${product.price.toLocaleString("es-CL")}</p>
      </Link>

      <button className="btn-add" onClick={handleAdd}>
        {animando ? "✔ Añadido" : "Agregar al carrito"}
      </button>
    </div>
  );
}
