import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { usarCarrito } from "../context/CarritoContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { agregarAlCarrito } = usarCarrito();

  if (!product) return <h2>Producto no encontrado</h2>;

  // Productos relacionados (misma categoría, excluyendo el actual)
  const relacionados = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Animación imagen voladora
  const handleAdd = () => {
    agregarAlCarrito(product);

    const img = document.querySelector(".detalle-img");
    const imgClone = img.cloneNode();

    imgClone.classList.add("volando");
    document.body.appendChild(imgClone);

    const rect = img.getBoundingClientRect();
    imgClone.style.left = rect.left + "px";
    imgClone.style.top = rect.top + "px";

    const carrito = document.querySelector(".carrito-icono").getBoundingClientRect();

    setTimeout(() => {
      imgClone.style.left = carrito.left + "px";
      imgClone.style.top = carrito.top + "px";
      imgClone.style.opacity = "0";
      imgClone.style.transform = "scale(0.2)";
    }, 20);

    setTimeout(() => {
      imgClone.remove();
    }, 800);
  };

  return (
    <div className="detalle-container">

      {/* Imagen del producto */}
      <img className="detalle-img" src={product.image} alt={product.name} />

      <div className="detalle-info">

        {/* Botón Volver */}
        <Link to="/productos" className="btn-volver">
          ← Volver
        </Link>

        <h2>{product.name}</h2>

        <p className="detalle-price">
          ${product.price.toLocaleString("es-CL")}
        </p>

        <p className="detalle-desc">{product.description}</p>

        <button className="btn-add" onClick={handleAdd}>
          Agregar al carrito
        </button>
      </div>

      {/* Sección de productos relacionados */}
      <div className="relacionados-container">
        <h3>Productos Relacionados</h3>

        <div className="relacionados-grid">
          {relacionados.map((rel) => (
            <Link
              to={`/producto/${rel.id}`}
              key={rel.id}
              className="relacionado-card"
            >
              <img src={rel.image} alt={rel.name} />
              <p>{rel.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
